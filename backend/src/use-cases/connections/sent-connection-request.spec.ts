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
    const requester = await usersRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: '123456',
    })

    const addressee = await usersRepository.create({
      name: 'Bob',
      email: 'bob@example.com',
      passwordHash: '123456',
    })

    const { connection } = await sut.execute({
      requesterId: requester.id,
      addresseeId: addressee.id,
    })

    expect(connection.id).toEqual(expect.any(String))
    expect(connection.requesterId).toBe(requester.id)
    expect(connection.addresseeId).toBe(addressee.id)
    expect(connection.status).toBe('PENDING')
  })

  it('should not allow sending a connection to a non-existent user', async () => {
    const requester = await usersRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: '123456',
    })

    await expect(() =>
      sut.execute({
        requesterId: requester.id,
        addresseeId: 'non-existent-id',
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
        requesterId: user.id,
        addresseeId: user.id,
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
      requesterId: userA.id,
      addresseeId: userB.id,
    })

    await expect(() =>
      sut.execute({
        requesterId: userA.id,
        addresseeId: userB.id,
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
      requesterId: userB.id,
      addresseeId: userA.id,
    })

    // Alice envia depois — deve aceitar automaticamente
    const { connection } = await sut.execute({
      requesterId: userA.id,
      addresseeId: userB.id,
    })

    expect(connection.status).toBe('ACCEPTED')
    expect(connection.requesterId).toBe(userB.id) // permanece o original
    expect(connection.addresseeId).toBe(userA.id)
  })
})
