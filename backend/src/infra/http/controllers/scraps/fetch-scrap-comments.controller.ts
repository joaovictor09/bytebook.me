import { FetchScrapCommentsUseCase } from '@/use-cases/scraps/fetch-scrap-comments'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('/scraps/:scrapId/comments')
export class FetchScrapCommentsController {
  constructor(private fetchScrapComments: FetchScrapCommentsUseCase) {}

  @Get()
  async handle(@Param('scrapId') scrapId: string) {
    const { comments } = await this.fetchScrapComments.execute({ scrapId })

    return {
      comments,
    }
  }
}
