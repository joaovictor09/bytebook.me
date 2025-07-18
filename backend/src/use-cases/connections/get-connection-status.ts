import { ConnectionsRepository } from '@/repositories/connections-repository'
import { Injectable } from '@nestjs/common'
import { ConnectionStatus } from '@prisma/client'

interface GetConnectionStatusRequest {
  userAId: string
  userBId: string
}

interface GetConnectionStatusResponse {
  status: ConnectionStatus | 'NONE'
  connectionId: string | null
}

@Injectable()
export class GetConnectionStatusUseCase {
  constructor(private connectionsRepository: ConnectionsRepository) {}

  async execute({
    userAId,
    userBId,
  }: GetConnectionStatusRequest): Promise<GetConnectionStatusResponse> {
    const connection = await this.connectionsRepository.findBetweenUsers(
      userAId,
      userBId,
    )

    if (!connection) {
      return {
        status: 'NONE',
        connectionId: null,
      }
    }

    return {
      status: connection.status,
      connectionId: connection.id,
    }
  }
}
