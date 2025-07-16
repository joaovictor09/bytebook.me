import { describe, it, expect, beforeEach } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryConnectionsRepository } from 'test/repositories/in-memory-connections-repository'

describe('InMemoryConnectionsRepository - findByUser', () => {
  let connectionsRepository: InMemoryConnectionsRepository

  const userA = randomUUID()
  const userB = randomUUID()
  const userC = randomUUID()

  beforeEach(() => {
    connectionsRepository = new InMemoryConnectionsRepository()
  })

  it('should return all connections involving the user', async () => {
    await connectionsRepository.create({
      senderId: userA,
      recipientId: userB,
      status: 'ACCEPTED',
    })

    await connectionsRepository.create({
      senderId: userC,
      recipientId: userA,
      status: 'PENDING',
    })

    const result = await connectionsRepository.fetchByUser({ userId: userA })

    expect(result).toHaveLength(2)
  })

  it('should return only SENT connections when filtered by direction', async () => {
    await connectionsRepository.create({
      senderId: userA,
      recipientId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      senderId: userC,
      recipientId: userA,
      status: 'PENDING',
    })

    const sent = await connectionsRepository.fetchByUser({
      userId: userA,
      direction: 'SENT',
    })

    expect(sent).toHaveLength(1)
    expect(sent[0].senderId).toBe(userA)
  })

  it('should return only RECEIVED connections when filtered by direction', async () => {
    await connectionsRepository.create({
      senderId: userA,
      recipientId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      senderId: userC,
      recipientId: userA,
      status: 'PENDING',
    })

    const received = await connectionsRepository.fetchByUser({
      userId: userA,
      direction: 'RECEIVED',
    })

    expect(received).toHaveLength(1)
    expect(received[0].recipientId).toBe(userA)
  })

  it('should filter by status', async () => {
    await connectionsRepository.create({
      senderId: userA,
      recipientId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      senderId: userB,
      recipientId: userA,
      status: 'ACCEPTED',
    })

    const accepted = await connectionsRepository.fetchByUser({
      userId: userA,
      status: 'ACCEPTED',
    })

    expect(accepted).toHaveLength(1)
    expect(accepted[0].status).toBe('ACCEPTED')
  })

  it('should filter by status and direction together', async () => {
    await connectionsRepository.create({
      senderId: userA,
      recipientId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      senderId: userB,
      recipientId: userA,
      status: 'PENDING',
    })

    const receivedPending = await connectionsRepository.fetchByUser({
      userId: userA,
      direction: 'RECEIVED',
      status: 'PENDING',
    })

    expect(receivedPending).toHaveLength(1)
    expect(receivedPending[0].senderId).toBe(userB)
    expect(receivedPending[0].status).toBe('PENDING')
  })
})
