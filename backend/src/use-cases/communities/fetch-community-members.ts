import { Injectable } from '@nestjs/common'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { CommunityMember } from '@prisma/client'

interface FetchCommunityMembersUseCaseRequest {
  communityId: string
}

interface FetchCommunityMembersUseCaseResponse {
  communityMembers: CommunityMember[]
}

@Injectable()
export class FetchCommunityMembersUseCase {
  constructor(private communityMembersRepository: CommunityMembersRepository) {}

  async execute({
    communityId,
  }: FetchCommunityMembersUseCaseRequest): Promise<FetchCommunityMembersUseCaseResponse> {
    const communityMembers =
      await this.communityMembersRepository.findManyByCommunityId(communityId)

    return {
      communityMembers,
    }
  }
}
