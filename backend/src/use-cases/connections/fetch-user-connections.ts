import { ConnectionsRepository } from '@/repositories/connections-repository'
import { Injectable } from '@nestjs/common'
import { Connection } from '@prisma/client'

interface FetchUserConnectionsRequest {
  userId: string
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  direction?: 'SENT' | 'RECEIVED'
}

interface FetchUserConnectionsResponse {
  connections: Connection[]
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

    return { connections }
  }
}
