import type { UsersRepository } from '@/repositories/users-repository'
import type { Connection } from '@prisma/client'
import type { ConnectionsRepository } from '@/repositories/connections-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidConnectionRequestError } from '../_errors/invalid-connection-request'

interface SentConnectionRequestUseCaseRequest {
  requesterId: string
  addresseeId: string
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
    addresseeId,
    requesterId,
  }: SentConnectionRequestUseCaseRequest): Promise<SentConnectionRequestUseCaseResponse> {
    const addressee = await this.usersRepository.findById(addresseeId)
    const requester = await this.usersRepository.findById(requesterId)

    if (!addressee || !requester) {
      throw new ResourceNotFoundError()
    }

    if (addressee.id === requester.id) {
      throw new InvalidConnectionRequestError()
    }

    const existingConnection =
      await this.connectionsRepository.findBetweenUsers(
        requesterId,
        addresseeId,
      )

    if (existingConnection) {
      if (existingConnection.status === 'PENDING') {
        const isReversed =
          existingConnection.requesterId === addresseeId &&
          existingConnection.addresseeId === requesterId

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
      addresseeId,
      requesterId,
    })

    return { connection }
  }
}
