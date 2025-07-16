import { Topic } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { TopicsRepository } from '@/repositories/topics-repository'
import { NotAllowedError } from '../_errors/not-allowed-error'

interface CreateTopicUseCaseRequest {
  userId: string
  communityId: string
  content: string
  title: string
}

interface CreateTopicUseCaseResponse {
  topic: Topic
}

@Injectable()
export class CreateTopicUseCase {
  constructor(
    private communityMembersRepository: CommunityMembersRepository,
    private topicsRepository: TopicsRepository,
  ) {}

  async execute({
    userId,
    communityId,
    content,
    title,
  }: CreateTopicUseCaseRequest): Promise<CreateTopicUseCaseResponse> {
    const communityMember =
      await this.communityMembersRepository.findByUserAndCommunity(
        userId,
        communityId,
      )

    if (!communityMember) {
      throw new NotAllowedError()
    }

    const topic = await this.topicsRepository.create({
      authorId: userId,
      communityId,
      content,
      title,
    })

    return { topic }
  }
}
