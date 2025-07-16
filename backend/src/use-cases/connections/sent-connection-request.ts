import type { UsersRepository } from '@/repositories/users-repository'
import type { Connection } from '@prisma/client'
import type { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

interface SentConnectionRequestUseCaseRequest {
  senderId: string
  recipientId: string
}

interface SentConnectionRequestUseCaseResponse {
  connection: Connection
}

export class SentConnectionRequestUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private connectionsRepository: ConnectionsRepository,
  ) {}

  async execute({
    recipientId,
    senderId,
  }: SentConnectionRequestUseCaseRequest): Promise<SentConnectionRequestUseCaseResponse> {
    const recipient = await this.usersRepository.findById(recipientId)
    const sender = await this.usersRepository.findById(senderId)

    if (!recipient || !sender) {
      throw new ResourceNotFoundError()
    }

    if (recipient.id === sender.id) {
      throw new InvalidConnectionRequestError()
    }

    const existingConnection =
      await this.connectionsRepository.findBetweenUsers(senderId, recipientId)

    if (existingConnection) {
      if (existingConnection.status === 'PENDING') {
        const isReversed =
          existingConnection.senderId === recipientId &&
          existingConnection.recipientId === senderId

        if (isReversed) {
          const connection = await this.connectionsRepository.accept(
            existingConnection.id,
          )

          return { connection }
        }

        throw new InvalidConnectionRequestError()
      }

      throw new InvalidConnectionRequestError()
    }

    const connection = await this.connectionsRepository.create({
      recipientId,
      senderId,
    })

    return { connection }
  }
}
