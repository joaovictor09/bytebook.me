import { beforeEach, describe, expect, it } from 'vitest'
import { RemoveConnectionUseCase } from './remove-connection'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

let usersRepository: InMemoryUsersRepository
let connectionsRepository: InMemoryConnectionsRepository
let sut: RemoveConnectionUseCase

describe('Remove Connection Request Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    connectionsRepository = new InMemoryConnectionsRepository()
    sut = new RemoveConnectionUseCase(usersRepository, connectionsRepository)
  })

  it('should remove an accepted connection when requested by requester', async () => {
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

    await sut.execute({
      userId: requester.id,
      connectionId: connection.id,
    })

    const found = await connectionsRepository.findById(connection.id)
    expect(found).toBeNull()
  })

  it('should remove an accepted connection when requested by addressee', async () => {
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

    await sut.execute({
      userId: addressee.id,
      connectionId: connection.id,
    })

    const found = await connectionsRepository.findById(connection.id)
    expect(found).toBeNull()
  })

  it('should not remove if user does not exist', async () => {
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
        userId: 'non-existent-id',
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not remove if connection does not exist', async () => {
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

  it('should not remove if connection is not accepted', async () => {
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
      status: 'PENDING',
    })

    await expect(() =>
      sut.execute({
        userId: requester.id,
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })

  it('should not remove if user is not requester or addressee', async () => {
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

    const stranger = await usersRepository.create({
      name: 'Stranger',
      email: 'stranger@example.com',
      passwordHash: 'hash',
    })

    const connection = await connectionsRepository.create({
      requesterId: requester.id,
      addresseeId: addressee.id,
      status: 'ACCEPTED',
    })

    await expect(() =>
      sut.execute({
        userId: stranger.id,
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })
})
