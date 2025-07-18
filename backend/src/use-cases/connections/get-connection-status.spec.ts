import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetConnectionStatusUseCase } from './get-connection-status'
import { ConnectionStatus } from '@prisma/client'

let usersRepository: InMemoryUsersRepository
let connectionsRepository: InMemoryConnectionsRepository
let sut: GetConnectionStatusUseCase

describe('Get Connection Status Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    connectionsRepository = new InMemoryConnectionsRepository(usersRepository)
    sut = new GetConnectionStatusUseCase(connectionsRepository)

    usersRepository.items.push(
      {
        id: 'user1',
        name: 'User One',
        email: 'user1@example.com',
        passwordHash: 'hash',
        created_at: new Date(),
        role: 'MEMBER',
      },
      {
        id: 'user2',
        name: 'User Two',
        email: 'user2@example.com',
        passwordHash: 'hash',
        created_at: new Date(),
        role: 'MEMBER',
      },
    )
  })

  it('should return the connection status between two users if it exists', async () => {
    connectionsRepository.items.push({
      id: 'conn1',
      senderId: 'user1',
      recipientId: 'user2',
      status: 'ACCEPTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const { status } = await sut.execute({
      userAId: 'user1',
      userBId: 'user2',
    })

    expect(status).toBe<ConnectionStatus>('ACCEPTED')
  })

  it('should return the connection status even if userA and userB are inverted', async () => {
    connectionsRepository.items.push({
      id: 'conn1',
      senderId: 'user2',
      recipientId: 'user1',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const { status } = await sut.execute({
      userAId: 'user1',
      userBId: 'user2',
    })

    expect(status).toBe<ConnectionStatus>('PENDING')
  })

  it('should return NONE if there is no connection between the users', async () => {
    const { status } = await sut.execute({
      userAId: 'user1',
      userBId: 'user2',
    })

    expect(status).toBe('NONE')
  })
})
