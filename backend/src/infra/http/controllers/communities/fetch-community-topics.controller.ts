import { FetchCommunityTopicsUseCase } from '@/use-cases/communities/fetch-community-topics'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('/communities/:communityId/topics')
export class FetchCommunityTopicsController {
  constructor(private fetchCommunityTopics: FetchCommunityTopicsUseCase) {}

  @Get()
  async handle(@Param('communityId') communityId: string) {
    const { topics } = await this.fetchCommunityTopics.execute({
      communityId,
    })

    return {
      topics,
    }
  }
}
