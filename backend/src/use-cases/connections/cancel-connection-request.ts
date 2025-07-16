import type { UsersRepository } from '@/repositories/users-repository'
import type { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

interface CancelConnectionRequestUseCaseRequest {
  userId: string
  connectionId: string
}

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

    if (connection.requesterId !== user.id) {
      throw new InvalidConnectionRequestError()
    }

    await this.connectionsRepository.delete(connectionId)
  }
}
