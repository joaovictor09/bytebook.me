import { Injectable } from '@nestjs/common'
import { TopicsRepository } from '@/repositories/topics-repository'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { TopicCommentsRepository } from '@/repositories/topic-comments-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface DeleteTopicCommentUseCaseRequest {
  userId: string
  topicCommentId: string
}

@Injectable()
export class DeleteTopicCommentUseCase {
  constructor(
    private topicsRepository: TopicsRepository,
    private topicCommentsRepository: TopicCommentsRepository,
  ) {}

  async execute({
    userId,
    topicCommentId,
  }: DeleteTopicCommentUseCaseRequest): Promise<void> {
    const topicComment =
      await this.topicCommentsRepository.findById(topicCommentId)

    if (!topicComment) {
      throw new ResourceNotFoundError()
    }

    const topic = await this.topicsRepository.findById(topicComment.topicId)

    if (!topicComment) {
      throw new ResourceNotFoundError()
    }

    if (userId !== topicComment.authorId && userId !== topic?.authorId) {
      throw new NotAllowedError()
    }

    await this.topicCommentsRepository.delete(topicCommentId)
  }
}
