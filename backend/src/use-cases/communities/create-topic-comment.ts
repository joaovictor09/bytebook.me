import { TopicComment } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { TopicsRepository } from '@/repositories/topics-repository'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { TopicCommentsRepository } from '@/repositories/topic-comments-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface CreateTopicCommentUseCaseRequest {
  userId: string
  topicId: string
  message: string
}

interface CreateTopicCommentUseCaseResponse {
  topicComment: TopicComment
}

@Injectable()
export class CreateTopicCommentUseCase {
  constructor(
    private communityMembersRepository: CommunityMembersRepository,
    private topicsRepository: TopicsRepository,
    private topicCommentsRepository: TopicCommentsRepository,
  ) {}

  async execute({
    userId,
    topicId,
    message,
  }: CreateTopicCommentUseCaseRequest): Promise<CreateTopicCommentUseCaseResponse> {
    const topic = await this.topicsRepository.findById(topicId)
    if (!topic) {
      throw new ResourceNotFoundError()
    }

    const communityMember =
      await this.communityMembersRepository.findByUserAndCommunity(
        userId,
        topic.communityId,
      )
    if (!communityMember) {
      throw new NotAllowedError()
    }

    const topicComment = await this.topicCommentsRepository.create({
      authorId: userId,
      topicId,
      message,
    })

    return { topicComment }
  }
}
