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
      requesterId: userA,
      addresseeId: userB,
      status: 'ACCEPTED',
    })

    await connectionsRepository.create({
      requesterId: userC,
      addresseeId: userA,
      status: 'PENDING',
    })

    const result = await connectionsRepository.fetchByUser({ userId: userA })

    expect(result).toHaveLength(2)
  })

  it('should return only SENT connections when filtered by direction', async () => {
    await connectionsRepository.create({
      requesterId: userA,
      addresseeId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      requesterId: userC,
      addresseeId: userA,
      status: 'PENDING',
    })

    const sent = await connectionsRepository.fetchByUser({
      userId: userA,
      direction: 'SENT',
    })

    expect(sent).toHaveLength(1)
    expect(sent[0].requesterId).toBe(userA)
  })

  it('should return only RECEIVED connections when filtered by direction', async () => {
    await connectionsRepository.create({
      requesterId: userA,
      addresseeId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      requesterId: userC,
      addresseeId: userA,
      status: 'PENDING',
    })

    const received = await connectionsRepository.fetchByUser({
      userId: userA,
      direction: 'RECEIVED',
    })

    expect(received).toHaveLength(1)
    expect(received[0].addresseeId).toBe(userA)
  })

  it('should filter by status', async () => {
    await connectionsRepository.create({
      requesterId: userA,
      addresseeId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      requesterId: userB,
      addresseeId: userA,
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
      requesterId: userA,
      addresseeId: userB,
      status: 'PENDING',
    })

    await connectionsRepository.create({
      requesterId: userB,
      addresseeId: userA,
      status: 'PENDING',
    })

    const receivedPending = await connectionsRepository.fetchByUser({
      userId: userA,
      direction: 'RECEIVED',
      status: 'PENDING',
    })

    expect(receivedPending).toHaveLength(1)
    expect(receivedPending[0].requesterId).toBe(userB)
    expect(receivedPending[0].status).toBe('PENDING')
  })
})
