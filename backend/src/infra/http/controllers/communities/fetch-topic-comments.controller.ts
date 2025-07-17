import { FetchTopicCommentsUseCase } from '@/use-cases/communities/fetch-topic-comments'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('/topics/:topicId/comments')
export class FetchTopicCommentsTopicsController {
  constructor(private fetchTopicCommentsTopics: FetchTopicCommentsUseCase) {}

  @Get()
  async handle(@Param('topicId') topicId: string) {
    const { topicComments } = await this.fetchTopicCommentsTopics.execute({
      topicId,
    })

    return {
      topicComments,
    }
  }
}
