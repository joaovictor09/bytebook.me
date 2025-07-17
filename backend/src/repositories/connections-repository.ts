import type { Connection, Prisma, User } from '@prisma/client'

export type ConnectionWithUsers = Connection & {
  sender: User
  recipient: User
}

export abstract class ConnectionsRepository {
  abstract create(
    data: Prisma.ConnectionUncheckedCreateInput,
  ): Promise<Connection>

  abstract fetchByUser(params: {
    userId: string
    status?: string
    direction?: 'SENT' | 'RECEIVED'
  }): Promise<ConnectionWithUsers[]>

  abstract findBetweenUsers(
    userAId: string,
    userBId: string,
  ): Promise<Connection | null>

  abstract findById(id: string): Promise<Connection | null>

  abstract accept(connectionId: string): Promise<Connection>
  abstract decline(connectionId: string): Promise<Connection>

  abstract delete(connectionId: string): Promise<void>
}
