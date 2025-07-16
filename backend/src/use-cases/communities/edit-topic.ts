import { Topic } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { TopicsRepository } from '@/repositories/topics-repository'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface EditTopicUseCaseRequest {
  userId: string
  topicId: string
  content: string
  title: string
}

interface EditTopicUseCaseResponse {
  topic: Topic
}

@Injectable()
export class EditTopicUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    userId,
    topicId,
    content,
    title,
  }: EditTopicUseCaseRequest): Promise<EditTopicUseCaseResponse> {
    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      throw new ResourceNotFoundError()
    }

    if (topic.authorId !== userId) {
      throw new NotAllowedError()
    }

    topic.content = content
    topic.title = title

    await this.topicsRepository.save(topic)

    return { topic }
  }
}
