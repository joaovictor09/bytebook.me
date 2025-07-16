import { UsersRepository } from '@/repositories/users-repository'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'
import { Injectable } from '@nestjs/common'

interface RemoveConnectionUseCaseRequest {
  userId: string
  connectionId: string
}

@Injectable()
export class RemoveConnectionUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private connectionsRepository: ConnectionsRepository,
  ) {}

  async execute({
    userId,
    connectionId,
  }: RemoveConnectionUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    const connection = await this.connectionsRepository.findById(connectionId)

    if (!user || !connection) {
      throw new ResourceNotFoundError()
    }

    if (connection.status !== 'ACCEPTED') {
      throw new InvalidConnectionRequestError()
    }

    if (connection.senderId !== user.id && connection.recipientId !== user.id) {
      throw new InvalidConnectionRequestError()
    }

    await this.connectionsRepository.delete(connectionId)
  }
}
