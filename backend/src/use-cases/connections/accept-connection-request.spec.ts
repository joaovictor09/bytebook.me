import { AcceptConnectionRequestUseCase } from './accept-connection-request'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../errors/invalid-connection-request'

let usersRepository: InMemoryUsersRepository
let connectionsRepository: InMemoryConnectionsRepository
let sut: AcceptConnectionRequestUseCase

describe('Accept Connection Request UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    connectionsRepository = new InMemoryConnectionsRepository()
    sut = new AcceptConnectionRequestUseCase(
      usersRepository,
      connectionsRepository,
    )
  })

  it('should accept a pending connection request', async () => {
    const requester = await usersRepository.create({
      name: 'Requester',
      email: 'requester@example.com',
      passwordHash: 'hash',
    })

    const addressee = await usersRepository.create({
      name: 'Addressee',
      email: 'addressee@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      requesterId: requester.id,
      addresseeId: addressee.id,
    })

    const { connection: acceptedConnection } = await sut.execute({
      userId: addressee.id,
      connectionId: connection.id,
    })

    expect(acceptedConnection.status).toBe('ACCEPTED')
    expect(acceptedConnection.id).toBe(connection.id)
  })

  it('should not accept a connection if the user does not exist', async () => {
    const requester = await usersRepository.create({
      name: 'Requester',
      email: 'requester@example.com',
      passwordHash: 'hash',
    })

    const addressee = await usersRepository.create({
      name: 'Addressee',
      email: 'addressee@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      requesterId: requester.id,
      addresseeId: addressee.id,
    })

    await expect(() =>
      sut.execute({
        userId: 'non-existent-user-id',
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not accept a connection if the connection does not exist', async () => {
    const user = await usersRepository.create({
      name: 'User',
      email: 'user@example.com',
      passwordHash: 'hash',
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        connectionId: 'non-existent-connection-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not allow accepting if connection status is not PENDING', async () => {
    const requester = await usersRepository.create({
      name: 'Requester',
      email: 'requester@example.com',
      passwordHash: 'hash',
    })

    const addressee = await usersRepository.create({
      name: 'Addressee',
      email: 'addressee@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      requesterId: requester.id,
      addresseeId: addressee.id,
      status: 'ACCEPTED',
    })

    await expect(() =>
      sut.execute({
        userId: addressee.id,
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })

  it('should not allow a user who is not the addressee to accept the request', async () => {
    const requester = await usersRepository.create({
      name: 'Requester',
      email: 'requester@example.com',
      passwordHash: 'hash',
    })

    const addressee = await usersRepository.create({
      name: 'Addressee',
      email: 'addressee@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      requesterId: requester.id,
      addresseeId: addressee.id,
    })

    // requester tenta aceitar a própria solicitação
    await expect(() =>
      sut.execute({
        userId: requester.id,
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })
})
