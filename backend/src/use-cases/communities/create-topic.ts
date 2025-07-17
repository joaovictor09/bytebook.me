import { Topic } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { TopicsRepository } from '@/repositories/topics-repository'
import { CommunitiesRepository } from '@/repositories/communities-repository'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

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
    private communitiesRepository: CommunitiesRepository,
  ) {}

  async execute({
    userId,
    communityId,
    content,
    title,
  }: CreateTopicUseCaseRequest): Promise<CreateTopicUseCaseResponse> {
    // 1. Verifica se a comunidade existe
    const community = await this.communitiesRepository.findById(communityId)
    if (!community) {
      throw new ResourceNotFoundError('Community not found')
    }

    // 2. Verifica se o usuário é membro
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
