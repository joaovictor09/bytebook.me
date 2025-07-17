import { Injectable } from '@nestjs/common'
import { Community } from '@prisma/client'
import { CommunitiesRepository } from '@/repositories/communities-repository'

interface FetchUserCommunitiesUseCaseRequest {
  userId: string
}

interface FetchUserCommunitiesUseCaseResponse {
  communities: Community[]
}

@Injectable()
export class FetchUserCommunitiesUseCase {
  constructor(private communitiesRepository: CommunitiesRepository) {}

  async execute({
    userId,
  }: FetchUserCommunitiesUseCaseRequest): Promise<FetchUserCommunitiesUseCaseResponse> {
    const communities =
      await this.communitiesRepository.findManyByUserId(userId)

    return {
      communities,
    }
  }
}
