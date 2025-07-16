import { beforeEach, describe, expect, it } from 'vitest'
import { CancelConnectionRequestUseCase } from './cancel-connection-request'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

let usersRepository: InMemoryUsersRepository
let connectionsRepository: InMemoryConnectionsRepository
let sut: CancelConnectionRequestUseCase

describe('Cancel Connection Request Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    connectionsRepository = new InMemoryConnectionsRepository()
    sut = new CancelConnectionRequestUseCase(
      usersRepository,
      connectionsRepository,
    )
  })

  it('should cancel a pending connection request', async () => {
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

    await sut.execute({
      userId: sender.id,
      connectionId: connection.id,
    })

    const stillExists = await connectionsRepository.findById(connection.id)
    expect(stillExists).toBeNull()
  })

  it('should not cancel if user does not exist', async () => {
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
        userId: 'non-existent-id',
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not cancel if connection does not exist', async () => {
    const sender = await usersRepository.create({
      name: 'sender',
      email: 'sender@example.com',
      passwordHash: 'hash',
    })

    await expect(() =>
      sut.execute({
        userId: sender.id,
        connectionId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not cancel if connection is not pending', async () => {
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
        userId: sender.id,
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })

  it('should not cancel if user is not the sender', async () => {
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
        userId: recipient.id, // tentando cancelar quem recebeu
        connectionId: connection.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })
})
