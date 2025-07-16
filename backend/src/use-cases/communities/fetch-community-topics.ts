import { Injectable } from '@nestjs/common'
import { Topic } from '@prisma/client'
import { TopicsRepository } from '@/repositories/topics-repository'

interface FetchCommunityTopicsUseCaseRequest {
  communityId: string
}

interface FetchCommunityTopicsUseCaseResponse {
  topics: Topic[]
}

@Injectable()
export class FetchCommunityTopicsUseCase {
  constructor(private topicsRepository: TopicsRepository) {}

  async execute({
    communityId,
  }: FetchCommunityTopicsUseCaseRequest): Promise<FetchCommunityTopicsUseCaseResponse> {
    const topics =
      await this.topicsRepository.findManyByCommunityId(communityId)

    return {
      topics,
    }
  }
}
