import type { ConnectionsRepository } from '@/repositories/connections-repository'
import type { Connection } from '@prisma/client'

interface FetchUserConnectionsRequest {
  userId: string
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  direction?: 'SENT' | 'RECEIVED'
}

interface FetchUserConnectionsResponse {
  connections: Connection[]
}

export class FetchUserConnections {
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

    return { connections }
  }
}
