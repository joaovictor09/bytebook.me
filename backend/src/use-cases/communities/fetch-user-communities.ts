import { Injectable } from '@nestjs/common'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { CommunityMember } from '@prisma/client'

interface FetchUserCommunitiesUseCaseRequest {
  userId: string
}

interface FetchUserCommunitiesUseCaseResponse {
  communityMembers: CommunityMember[]
}

@Injectable()
export class FetchUserCommunitiesUseCase {
  constructor(private communityMembersRepository: CommunityMembersRepository) {}

  async execute({
    userId,
  }: FetchUserCommunitiesUseCaseRequest): Promise<FetchUserCommunitiesUseCaseResponse> {
    const communityMembers =
      await this.communityMembersRepository.findManyByUserId(userId)

    return {
      communityMembers,
    }
  }
}
