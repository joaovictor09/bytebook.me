import { CommunityMember } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CommunitiesRepository } from '@/repositories/communities-repository'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface JoinCommunityUseCaseRequest {
  userId: string
  communityId: string
}

interface JoinCommunityUseCaseResponse {
  communityMember: CommunityMember
}

@Injectable()
export class JoinCommunityUseCase {
  constructor(
    private communitiesRepository: CommunitiesRepository,
    private communityMembersRepository: CommunityMembersRepository,
  ) {}

  async execute({
    userId,
    communityId,
  }: JoinCommunityUseCaseRequest): Promise<JoinCommunityUseCaseResponse> {
    const community = await this.communitiesRepository.findById(communityId)

    if (!community) {
      throw new ResourceNotFoundError()
    }

    const communityMember = await this.communityMembersRepository.create({
      communityId,
      userId,
    })

    await this.communitiesRepository.incrementMemberCount(communityId)

    return { communityMember }
  }
}
