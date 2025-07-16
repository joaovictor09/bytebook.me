import { Injectable } from '@nestjs/common'
import { CommunitiesRepository } from '@/repositories/communities-repository'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { ForbiddenError } from '../_errors/forbidden-error'

interface LeaveCommunityUseCaseRequest {
  userId: string
  communityId: string
}

@Injectable()
export class LeaveCommunityUseCase {
  constructor(
    private communitiesRepository: CommunitiesRepository,
    private communityMembersRepository: CommunityMembersRepository,
  ) {}

  async execute({
    userId,
    communityId,
  }: LeaveCommunityUseCaseRequest): Promise<void> {
    const communityMember =
      await this.communityMembersRepository.findByUserAndCommunity(
        userId,
        communityId,
      )

    const community = await this.communitiesRepository.findById(communityId)

    if (!communityMember || !community) {
      throw new ResourceNotFoundError()
    }

    if (community.ownerId === userId) {
      throw new ForbiddenError('Owner cannot leave the community')
    }

    await this.communityMembersRepository.deleteByUserAndCommunity(
      userId,
      communityId,
    )
    await this.communitiesRepository.decrementMemberCount(communityId)
  }
}
