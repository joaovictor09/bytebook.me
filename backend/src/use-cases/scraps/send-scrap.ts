import type { UsersRepository } from '@/repositories/users-repository'
import type { Scrap } from '@prisma/client'
import { InvalidScrapOperationError } from '../_errors/invalid-scrap-operation-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import type { ScrapsRepository } from '@/repositories/scraps-repository'

interface SendScrapUseCaseRequest {
  senderId: string
  recipientId: string
  message: string
}

interface SendScrapUseCaseResponse {
  scrap: Scrap
}

export class SendScrapUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private scrapsRepository: ScrapsRepository,
  ) {}

  async execute({
    senderId,
    recipientId,
    message,
  }: SendScrapUseCaseRequest): Promise<SendScrapUseCaseResponse> {
    if (senderId === recipientId) {
      throw new InvalidScrapOperationError()
    }

    const sender = await this.usersRepository.findById(senderId)
    const recipient = await this.usersRepository.findById(recipientId)

    if (!sender || !recipient) {
      throw new ResourceNotFoundError()
    }

    const scrap = await this.scrapsRepository.create({
      senderId,
      recipientId,
      message,
    })

    return { scrap }
  }
}
