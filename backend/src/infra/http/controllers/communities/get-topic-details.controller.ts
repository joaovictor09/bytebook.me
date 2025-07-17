import { GetTopicDetailsUseCase } from '@/use-cases/communities/get-topic-details'
import { Controller, Get, Param, NotFoundException } from '@nestjs/common'

@Controller('/topics/:topicId')
export class GetTopicDetailsController {
  constructor(private getTopicDetails: GetTopicDetailsUseCase) {}

  @Get()
  async handle(@Param('topicId') topicId: string) {
    try {
      const { topic } = await this.getTopicDetails.execute({
        topicId,
      })

      return {
        topic,
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new NotFoundException('Topic not found')
      }
      throw error
    }
  }
}
