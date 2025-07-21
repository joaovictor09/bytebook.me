import { ConnectionWithUserDto } from '@/dtos/connections.dto'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { Injectable } from '@nestjs/common'

interface FetchUserConnectionsRequest {
  userId: string
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  direction?: 'SENT' | 'RECEIVED'
}

interface FetchUserConnectionsResponse {
  connections: ConnectionWithUserDto[]
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
          recipientId: conn.recipientId,
          senderId: conn.senderId,
          user: {
            id: friend.id,
            name: friend.name,
            username: friend.username,
          },
        }
      }),
    }
  }
}
