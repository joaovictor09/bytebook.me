import type { UsersRepository } from '@/repositories/users-repository'
import type { ScrapComment } from '@prisma/client'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import type { ScrapsRepository } from '@/repositories/scraps-repository'
import type { ScrapCommentsRepository } from '@/repositories/scrap-comments-repository'

interface CommentScrapUseCaseRequest {
  senderId: string
  scrapId: string
  message: string
}

interface CommentScrapUseCaseResponse {
  comment: ScrapComment
}

export class CommentScrapUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private scrapsRepository: ScrapsRepository,
    private scrapCommentsRepository: ScrapCommentsRepository,
  ) {}

  async execute({
    senderId,
    scrapId,
    message,
  }: CommentScrapUseCaseRequest): Promise<CommentScrapUseCaseResponse> {
    const sender = await this.usersRepository.findById(senderId)
    const scrap = await this.scrapsRepository.findById(scrapId)

    if (!sender || !scrap) {
      throw new ResourceNotFoundError()
    }

    const comment = await this.scrapCommentsRepository.create({
      message,
      scrapId,
      senderId,
    })

    return { comment }
  }
}
