import { UsersRepository } from '@/repositories/users-repository'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'
import { Injectable } from '@nestjs/common'

interface CancelConnectionRequestUseCaseRequest {
  userId: string
  connectionId: string
}

@Injectable()
export class CancelConnectionRequestUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private connectionsRepository: ConnectionsRepository,
  ) {}

  async execute({
    userId,
    connectionId,
  }: CancelConnectionRequestUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    const connection = await this.connectionsRepository.findById(connectionId)

    if (!user || !connection) {
      throw new ResourceNotFoundError()
    }

    if (connection.status !== 'PENDING') {
      throw new InvalidConnectionRequestError()
    }

    if (connection.senderId !== user.id) {
      throw new InvalidConnectionRequestError()
    }

    await this.connectionsRepository.delete(connectionId)
  }
}
