import { ConnectionsRepository } from '@/repositories/connections-repository'
import { Injectable } from '@nestjs/common'

interface FetchUserConnectionsRequest {
  userId: string
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  direction?: 'SENT' | 'RECEIVED'
}

interface FetchUserConnectionsResponse {
  connections: Array<{
    id: string
    status: string
    createdAt: Date
    updatedAt: Date
    senderId: string
    recipientId: string
    friend: {
      id: string
      name: string
    }
  }>
}

@Injectable()
export class FetchUserConnectionsUseCase {
  constructor(private connectionsRepository: ConnectionsRepository) {}

  async execute({
    userId,
    status,
    direction,
  }: FetchUserConnectionsRequest): Promise<FetchUserConnectionsResponse> {
    const connections = await this.connectionsRepository.fetchByUser({
      userId,
      status,
      direction,
    })

    return {
      connections: connections.map((conn) => {
        const friend = conn.senderId === userId ? conn.recipient : conn.sender
        return {
          id: conn.id,
          status: conn.status,
          createdAt: conn.createdAt,
          updatedAt: conn.updatedAt,
          recipientId: conn.recipientId,
          senderId: conn.senderId,
          friend: {
            id: friend.id,
            name: friend.name,
          },
        }
      }),
    }
  }
}
