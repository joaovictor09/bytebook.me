import { Community } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CommunitiesRepository } from '@/repositories/communities-repository'
import { CommunityMembersRepository } from '@/repositories/community-members-repository'

interface CreateCommunityUseCaseRequest {
  userId: string
  name: string
  description: string
}

interface CreateCommunityUseCaseResponse {
  community: Community
}

@Injectable()
export class CreateCommunityUseCase {
  constructor(
    private communitiesRepository: CommunitiesRepository,
    private communityMembersRepository: CommunityMembersRepository,
  ) {}

  async execute({
    description,
    userId,
    name,
  }: CreateCommunityUseCaseRequest): Promise<CreateCommunityUseCaseResponse> {
    const community = await this.communitiesRepository.create({
      description,
      name,
      ownerId: userId,
      memberCount: 1,
    })

    await this.communityMembersRepository.create({
      communityId: community.id,
      userId,
    })

    return { community }
  }
}
