import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import type { ScrapsRepository } from '@/repositories/scraps-repository'

interface DeleteScrapUseCaseRequest {
  scrapId: string
  userId: string
}

export class DeleteScrapUseCase {
  constructor(private scrapsRepository: ScrapsRepository) {}

  async execute({ scrapId, userId }: DeleteScrapUseCaseRequest): Promise<void> {
    const scrap = await this.scrapsRepository.findById(scrapId)

    if (!scrap) {
      throw new ResourceNotFoundError()
    }
    if (scrap.senderId !== userId && scrap.recipientId !== userId) {
      throw new UnauthorizedError()
    }

    await this.scrapsRepository.delete(scrapId)
  }
}
