import { ScrapCommentsRepository } from '@/repositories/scrap-comments-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { ScrapsRepository } from '@/repositories/scraps-repository'
import { Injectable } from '@nestjs/common'

interface DeleteScrapCommentUseCaseRequest {
  scrapCommentId: string
  userId: string
}

@Injectable()
export class DeleteScrapCommentUseCase {
  constructor(
    private scrapCommentsRepository: ScrapCommentsRepository,
    private scrapsRepository: ScrapsRepository,
  ) {}

  async execute({
    scrapCommentId,
    userId,
  }: DeleteScrapCommentUseCaseRequest): Promise<void> {
    const comment = await this.scrapCommentsRepository.findById(scrapCommentId)

    if (!comment) {
      throw new ResourceNotFoundError()
    }

    const scrap = await this.scrapsRepository.findById(comment.scrapId)

    if (comment.senderId !== userId && scrap?.recipientId !== userId) {
      throw new UnauthorizedError()
    }

    await this.scrapCommentsRepository.delete(scrapCommentId)
  }
}
