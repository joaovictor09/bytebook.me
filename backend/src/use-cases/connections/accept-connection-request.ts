import { UsersRepository } from '@/repositories/users-repository'
import { Connection } from '@prisma/client'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'
import { Injectable } from '@nestjs/common'

interface AcceptConnectionRequestUseCaseRequest {
  userId: string
  connectionId: string
}

interface AcceptConnectionRequestUseCaseResponse {
  connection: Connection
}

@Injectable()
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
