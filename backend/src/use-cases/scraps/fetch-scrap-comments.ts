import { ScrapComment } from '@prisma/client'
import { ScrapCommentsRepository } from '@/repositories/scrap-comments-repository'
import { Injectable } from '@nestjs/common'

interface FetchScrapCommentsUseCaseRequest {
  scrapId: string
}

interface FetchScrapCommentsUseCaseResponse {
  comments: ScrapComment[]
}

@Injectable()
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
