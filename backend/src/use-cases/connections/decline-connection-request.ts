import { UsersRepository } from '@/repositories/users-repository'
import { Connection } from '@prisma/client'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'
import { Injectable } from '@nestjs/common'

interface DeclineConnectionRequestUseCaseRequest {
  userId: string
  connectionId: string
}

interface DeclineConnectionRequestUseCaseResponse {
  connection: Connection
}

@Injectable()
export class DeclineConnectionRequestUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private connectionsRepository: ConnectionsRepository,
  ) {}

  async execute({
    userId,
    connectionId,
  }: DeclineConnectionRequestUseCaseRequest): Promise<DeclineConnectionRequestUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const connection = await this.connectionsRepository.findById(connectionId)

    if (!user || !connection) {
      throw new ResourceNotFoundError()
    }

    if (connection.status !== 'PENDING') {
      throw new InvalidConnectionRequestError()
    }

    if (connection.recipientId !== user.id) {
      throw new InvalidConnectionRequestError()
    }

    const declined = await this.connectionsRepository.decline(connectionId)

    return { connection: declined }
  }
}
