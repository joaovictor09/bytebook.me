import { Injectable } from '@nestjs/common'
import { TopicsRepository } from '@/repositories/topics-repository'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { CommunitiesRepository } from '@/repositories/communities-repository'

interface DeleteTopicUseCaseRequest {
  userId: string
  topicId: string
}

@Injectable()
export class DeleteTopicUseCase {
  constructor(
    private topicsRepository: TopicsRepository,
    private communitiesRepository: CommunitiesRepository,
  ) {}

  async execute({ userId, topicId }: DeleteTopicUseCaseRequest): Promise<void> {
    const topic = await this.topicsRepository.findById(topicId)

    if (!topic) {
      throw new ResourceNotFoundError()
    }

    const community = await this.communitiesRepository.findById(
      topic.communityId,
    )

    if (!community) {
      throw new Error()
    }

    if (userId !== topic.authorId && userId !== community.ownerId) {
      throw new NotAllowedError()
    }

    await this.topicsRepository.delete(topicId)
  }
}
