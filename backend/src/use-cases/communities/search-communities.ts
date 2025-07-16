import { Injectable } from '@nestjs/common'
import { Community } from '@prisma/client'
import { CommunitiesRepository } from '@/repositories/communities-repository'

interface SearchCommunitiesUseCaseRequest {
  query: string
}

interface SearchCommunitiesUseCaseResponse {
  communities: Community[]
}

@Injectable()
export class SearchCommunitiesUseCase {
  constructor(private communitiesRepository: CommunitiesRepository) {}

  async execute({
    query,
  }: SearchCommunitiesUseCaseRequest): Promise<SearchCommunitiesUseCaseResponse> {
    const communities = await this.communitiesRepository.findManyByName(query)

    return {
      communities,
    }
  }
}
