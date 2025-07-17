import { Injectable } from '@nestjs/common'
import {
  CommunityMembersRepository,
  CommunityMemberWithUser,
} from '@/repositories/community-members-repository'

interface FetchCommunityMembersUseCaseRequest {
  communityId: string
}

interface FetchCommunityMembersUseCaseResponse {
  communityMembers: CommunityMemberWithUser[]
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
