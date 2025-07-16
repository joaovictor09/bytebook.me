import { describe, it, expect, beforeEach } from 'vitest'
import { FetchUserConnections } from './fetch-user-connections'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'

let connectionsRepository: InMemoryConnectionsRepository
let sut: FetchUserConnections

describe('Fetch User Connections Use Case', () => {
  beforeEach(() => {
    connectionsRepository = new InMemoryConnectionsRepository()
    sut = new FetchUserConnections(connectionsRepository)
  })

  it('should fetch all connections of a user without filters', async () => {
    // Inserir conexões para teste
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
