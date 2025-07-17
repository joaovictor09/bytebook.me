import { Injectable } from '@nestjs/common'
import { Topic } from '@prisma/client'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { TopicsRepository } from '@/repositories/topics-repository'

interface GetTopicDetailsUseCaseRequest {
  topicId: string
}

interface GetTopicDetailsUseCaseResponse {
  topic: Topic
}

@Injectable()
export class GetTopicDetailsUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    topicId,
  }: GetTopicDetailsUseCaseRequest): Promise<GetTopicDetailsUseCaseResponse> {
    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      throw new ResourceNotFoundError()
    }

    return { topic }
  }
}
