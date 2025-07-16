import type { UsersRepository } from '@/repositories/users-repository'
import type { Connection } from '@prisma/client'
import type { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

interface AcceptConnectionRequestUseCaseRequest {
  userId: string
  connectionId: string
}

interface AcceptConnectionRequestUseCaseResponse {
  connection: Connection
}

export class AcceptConnectionRequestUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private connectionsRepository: ConnectionsRepository,
  ) {}

  async execute({
    userId,
    connectionId,
  }: AcceptConnectionRequestUseCaseRequest): Promise<AcceptConnectionRequestUseCaseResponse> {
    const recipient = await this.usersRepository.findById(userId)
    if (!recipient) {
      throw new ResourceNotFoundError()
    }

    const connection = await this.connectionsRepository.findById(connectionId)
    if (!connection) {
      throw new ResourceNotFoundError()
    }

    const isPending = connection.status === 'PENDING'
    const isAddressee = connection.recipientId === recipient.id

    if (!isPending || !isAddressee) {
      throw new InvalidConnectionRequestError()
    }

    const updatedConnection =
      await this.connectionsRepository.accept(connectionId)

    return { connection: updatedConnection }
  }
}
