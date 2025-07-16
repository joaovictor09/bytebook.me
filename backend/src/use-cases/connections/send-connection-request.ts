import { UsersRepository } from '@/repositories/users-repository'
import { Connection } from '@prisma/client'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'
import { Injectable } from '@nestjs/common'

interface SendConnectionRequestUseCaseRequest {
  senderId: string
  recipientId: string
}

interface SendConnectionRequestUseCaseResponse {
  connection: Connection
}

@Injectable()
export class SendConnectionRequestUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private connectionsRepository: ConnectionsRepository,
  ) {}

  async execute({
    recipientId,
    senderId,
  }: SendConnectionRequestUseCaseRequest): Promise<SendConnectionRequestUseCaseResponse> {
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
