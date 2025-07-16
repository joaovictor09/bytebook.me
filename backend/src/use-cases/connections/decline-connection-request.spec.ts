import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { DeclineConnectionRequestUseCase } from './decline-connection-request'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

let usersRepository: InMemoryUsersRepository
let connectionsRepository: InMemoryConnectionsRepository
let sut: DeclineConnectionRequestUseCase

describe('DeclineConnectionRequestUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    connectionsRepository = new InMemoryConnectionsRepository()
    sut = new DeclineConnectionRequestUseCase(
      usersRepository,
      connectionsRepository,
    )
  })

  it('should decline a pending connection request', async () => {
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

    const { connection: declined } = await sut.execute({
      userId: addressee.id,
      connectionId: connection.id,
    })

    expect(declined.status).toBe('DECLINED')
    expect(declined.id).toBe(connection.id)
  })

  it('should not allow declining a connection if the user does not exist', async () => {
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

  it('should not allow declining a non-existent connection', async () => {
    const user = await usersRepository.create({
      name: 'User',
      email: 'user@example.com',
      passwordHash: 'hash',
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        connectionId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not allow declining a connection that is not pending', async () => {
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

  it('should not allow declining if the user is not the addressee', async () => {
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
        userId: requester.id, // o requester tentando recusar
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })
})
