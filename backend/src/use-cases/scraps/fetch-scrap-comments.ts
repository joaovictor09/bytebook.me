import type { ScrapComment } from '@prisma/client'
import type { ScrapCommentsRepository } from '@/repositories/scrap-comments-repository'

interface FetchScrapCommentsUseCaseRequest {
  scrapId: string
}

interface FetchScrapCommentsUseCaseResponse {
  comments: ScrapComment[]
}

export class FetchScrapCommentsUseCase {
  constructor(private scrapCommentsRepository: ScrapCommentsRepository) {}

  async execute({
    scrapId,
  }: FetchScrapCommentsUseCaseRequest): Promise<FetchScrapCommentsUseCaseResponse> {
    const comments =
      await this.scrapCommentsRepository.findManyByScrapId(scrapId)

    return { comments }
  }
}
