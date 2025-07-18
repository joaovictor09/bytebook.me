import { describe, it, expect, beforeEach } from 'vitest'
import { FetchUserConnectionsUseCase } from './fetch-user-connections'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let connectionsRepository: InMemoryConnectionsRepository
let sut: FetchUserConnectionsUseCase

describe('Fetch User Connections Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    connectionsRepository = new InMemoryConnectionsRepository(usersRepository)
    sut = new FetchUserConnectionsUseCase(connectionsRepository)

    usersRepository.items.push(
      {
        id: 'user1',
        name: 'user1',
        email: 'user1@example.com',
        passwordHash: 'hash',
        created_at: new Date(),
        role: 'MEMBER',
      },
      {
        id: 'user2',
        name: 'user2',
        email: 'user2@example.com',
        passwordHash: 'hash',
        created_at: new Date(),
        role: 'MEMBER',
      },
      {
        id: 'user3',
        name: 'user3',
        email: 'user3@example.com',
        passwordHash: 'hash',
        created_at: new Date(),
        role: 'MEMBER',
      },
      {
        id: 'user4',
        name: 'user4',
        email: 'user4@example.com',
        passwordHash: 'hash',
        created_at: new Date(),
        role: 'MEMBER',
      },
    )
  })

  it('should fetch all connections of a user without filters', async () => {
    connectionsRepository.items.push(
      {
        id: '1',
        senderId: 'user1',
        recipientId: 'user2',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        senderId: 'user3',
        recipientId: 'user1',
        status: 'ACCEPTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        senderId: 'user1',
        recipientId: 'user4',
        status: 'DECLINED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )

    const { connections } = await sut.execute({ userId: 'user1' })

    expect(connections.length).toBe(3)
    expect(connections.map((c) => c.id)).toEqual(
      expect.arrayContaining(['1', '2', '3']),
    )
  })

  it('should fetch connections filtered by status', async () => {
    connectionsRepository.items.push(
      {
        id: '1',
        senderId: 'user1',
        recipientId: 'user2',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        senderId: 'user3',
        recipientId: 'user1',
        status: 'ACCEPTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )

    const { connections } = await sut.execute({
      userId: 'user1',
      status: 'ACCEPTED',
    })

    expect(connections.length).toBe(1)
    expect(connections[0].status).toBe('ACCEPTED')
  })

  it('should fetch connections filtered by direction SENT', async () => {
    connectionsRepository.items.push(
      {
        id: '1',
        senderId: 'user1',
        recipientId: 'user2',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        senderId: 'user3',
        recipientId: 'user1',
        status: 'ACCEPTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )

    const { connections } = await sut.execute({
      userId: 'user1',
      direction: 'SENT',
    })

    expect(connections.length).toBe(1)
    expect(connections[0].senderId).toBe('user1')
  })

  it('should fetch connections filtered by direction RECEIVED', async () => {
    connectionsRepository.items.push(
      {
        id: '1',
        senderId: 'user1',
        recipientId: 'user2',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        senderId: 'user3',
        recipientId: 'user1',
        status: 'ACCEPTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )

    const { connections } = await sut.execute({
      userId: 'user1',
      direction: 'RECEIVED',
    })

    expect(connections.length).toBe(1)
    expect(connections[0].recipientId).toBe('user1')
  })
})
