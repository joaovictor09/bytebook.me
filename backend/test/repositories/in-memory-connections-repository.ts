import type { ConnectionsRepository } from '@/repositories/connections-repository'
import type { Connection, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryConnectionsRepository implements ConnectionsRepository {
  public items: Connection[] = []

  async create(
    data: Prisma.ConnectionUncheckedCreateInput,
  ): Promise<Connection> {
    const connection: Connection = {
      id: randomUUID(),
      senderId: data.senderId,
      recipientId: data.recipientId,
      status: data.status ?? 'PENDING',
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
    }

    this.items.push(connection)
    return connection
  }

  async findBetweenUsers(
    userAId: string,
    userBId: string,
  ): Promise<Connection | null> {
    return (
      this.items.find(
        (item) =>
          (item.senderId === userAId && item.recipientId === userBId) ||
          (item.senderId === userBId && item.recipientId === userAId),
      ) ?? null
    )
  }

  async accept(connectionId: string): Promise<Connection> {
    const index = this.items.findIndex((item) => item.id === connectionId)

    if (index === -1) {
      throw new Error('Connection not found')
    }

    const updated: Connection = {
      ...this.items[index],
      status: 'ACCEPTED',
      updatedAt: new Date(),
    }

    this.items[index] = updated
    return updated
  }

  async decline(connectionId: string): Promise<Connection> {
    const index = this.items.findIndex((item) => item.id === connectionId)

    if (index === -1) {
      throw new Error('Connection not found')
    }

    const updated: Connection = {
      ...this.items[index],
      status: 'DECLINED',
      updatedAt: new Date(),
    }

    this.items[index] = updated
    return updated
  }

  async fetchByUser(params: {
    userId: string
    status?: 'PENDING' | 'ACCEPTED' | 'DECLINED'
    direction?: 'SENT' | 'RECEIVED'
  }): Promise<Connection[]> {
    return this.items.filter((connection) => {
      const isParticipant =
        connection.senderId === params.userId ||
        connection.recipientId === params.userId

      const matchesDirection =
        !params.direction ||
        (params.direction === 'SENT' &&
          connection.senderId === params.userId) ||
        (params.direction === 'RECEIVED' &&
          connection.recipientId === params.userId)

      const matchesStatus =
        !params.status || connection.status === params.status

      return isParticipant && matchesDirection && matchesStatus
    })
  }

  async findById(id: string): Promise<Connection | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  clear() {
    this.items = []
  }
}
