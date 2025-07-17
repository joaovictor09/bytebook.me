import { TopicCommentsRepository } from '@/repositories/topic-comments-repository'
import { Injectable } from '@nestjs/common'
import { TopicComment } from '@prisma/client'

interface FetchTopicCommentsUseCaseRequest {
  topicId: string
}

interface FetchTopicCommentsUseCaseResponse {
  topicComments: TopicComment[]
}

@Injectable()
export class FetchTopicCommentsUseCase {
  constructor(private topicCommentsRepository: TopicCommentsRepository) {}

  async execute({
    topicId,
  }: FetchTopicCommentsUseCaseRequest): Promise<FetchTopicCommentsUseCaseResponse> {
    const topicComments =
      await this.topicCommentsRepository.findManyByTopicId(topicId)

    return {
      topicComments,
    }
  }
}
