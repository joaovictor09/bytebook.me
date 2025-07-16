import { AcceptConnectionRequestUseCase } from './accept-connection-request'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

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
    const sender = await usersRepository.create({
      name: 'sender',
      email: 'sender@example.com',
      passwordHash: 'hash',
    })

    const recipient = await usersRepository.create({
      name: 'recipient',
      email: 'recipient@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      senderId: sender.id,
      recipientId: recipient.id,
    })

    const { connection: acceptedConnection } = await sut.execute({
      userId: recipient.id,
      connectionId: connection.id,
    })

    expect(acceptedConnection.status).toBe('ACCEPTED')
    expect(acceptedConnection.id).toBe(connection.id)
  })

  it('should not accept a connection if the user does not exist', async () => {
    const sender = await usersRepository.create({
      name: 'sender',
      email: 'sender@example.com',
      passwordHash: 'hash',
    })

    const recipient = await usersRepository.create({
      name: 'recipient',
      email: 'recipient@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      senderId: sender.id,
      recipientId: recipient.id,
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
    const sender = await usersRepository.create({
      name: 'sender',
      email: 'sender@example.com',
      passwordHash: 'hash',
    })

    const recipient = await usersRepository.create({
      name: 'recipient',
      email: 'recipient@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      senderId: sender.id,
      recipientId: recipient.id,
      status: 'ACCEPTED',
    })

    await expect(() =>
      sut.execute({
        userId: recipient.id,
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })

  it('should not allow a user who is not the recipient to accept the request', async () => {
    const sender = await usersRepository.create({
      name: 'sender',
      email: 'sender@example.com',
      passwordHash: 'hash',
    })

    const recipient = await usersRepository.create({
      name: 'recipient',
      email: 'recipient@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      senderId: sender.id,
      recipientId: recipient.id,
    })

    // sender tenta aceitar a própria solicitação
    await expect(() =>
      sut.execute({
        userId: sender.id,
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })
})
