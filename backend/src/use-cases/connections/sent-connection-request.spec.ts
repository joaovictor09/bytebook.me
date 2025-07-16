import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { SentConnectionRequestUseCase } from './sent-connection-request'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

let usersRepository: InMemoryUsersRepository
let connectionsRepository: InMemoryConnectionsRepository
let sut: SentConnectionRequestUseCase

describe('Sent Connection Request Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    connectionsRepository = new InMemoryConnectionsRepository()
    sut = new SentConnectionRequestUseCase(
      usersRepository,
      connectionsRepository,
    )
  })

  it('should send a connection request from one user to another', async () => {
    const sender = await usersRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: '123456',
    })

    const recipient = await usersRepository.create({
      name: 'Bob',
      email: 'bob@example.com',
      passwordHash: '123456',
    })

    const { connection } = await sut.execute({
      senderId: sender.id,
      recipientId: recipient.id,
    })

    expect(connection.id).toEqual(expect.any(String))
    expect(connection.senderId).toBe(sender.id)
    expect(connection.recipientId).toBe(recipient.id)
    expect(connection.status).toBe('PENDING')
  })

  it('should not allow sending a connection to a non-existent user', async () => {
    const sender = await usersRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: '123456',
    })

    await expect(() =>
      sut.execute({
        senderId: sender.id,
        recipientId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not allow sending a connection to yourself', async () => {
    const user = await usersRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: '123456',
    })

    await expect(() =>
      sut.execute({
        senderId: user.id,
        recipientId: user.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })

  it('should not allow sending a duplicate connection request', async () => {
    const userA = await usersRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: '123456',
    })

    const userB = await usersRepository.create({
      name: 'Bob',
      email: 'bob@example.com',
      passwordHash: '123456',
    })

    await sut.execute({
      senderId: userA.id,
      recipientId: userB.id,
    })

    await expect(() =>
      sut.execute({
        senderId: userA.id,
        recipientId: userB.id,
      }),
    ).rejects.toBeInstanceOf(InvalidConnectionRequestError)
  })

  it('should automatically accept a reversed pending connection request', async () => {
    const userA = await usersRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: '123456',
    })

    const userB = await usersRepository.create({
      name: 'Bob',
      email: 'bob@example.com',
      passwordHash: '123456',
    })

    // Bob envia primeiro
    await sut.execute({
      senderId: userB.id,
      recipientId: userA.id,
    })

    // Alice envia depois — deve aceitar automaticamente
    const { connection } = await sut.execute({
      senderId: userA.id,
      recipientId: userB.id,
    })

    expect(connection.status).toBe('ACCEPTED')
    expect(connection.senderId).toBe(userB.id) // permanece o original
    expect(connection.recipientId).toBe(userA.id)
  })
})
