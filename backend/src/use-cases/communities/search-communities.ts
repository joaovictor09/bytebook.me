import { Injectable } from '@nestjs/common'
import { Community } from '@prisma/client'
import { CommunitiesRepository } from '@/repositories/communities-repository'

interface SearchCommunitiesUseCaseRequest {
  query?: string
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
    let communities: Community[]

    if (query && query.trim().length > 0) {
      communities = await this.communitiesRepository.findManyByName(query)
    } else {
      communities = await this.communitiesRepository.findAll()
    }

    return { communities }
  }
}
