import { Injectable } from '@nestjs/common'
import { Community } from '@prisma/client'
import { CommunitiesRepository } from '@/repositories/communities-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface GetCommunityDetailsUseCaseRequest {
  communityId: string
}

interface GetCommunityDetailsUseCaseResponse {
  community: Community
}

@Injectable()
export class GetCommunityDetailsUseCase {
  constructor(private communitiesRepository: CommunitiesRepository) {}

  async execute({
    communityId,
  }: GetCommunityDetailsUseCaseRequest): Promise<GetCommunityDetailsUseCaseResponse> {
    const community = await this.communitiesRepository.findById(communityId)

    if (!community) {
      throw new ResourceNotFoundError()
    }

    return { community }
  }
}
