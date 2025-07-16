import type { Scrap } from '@prisma/client'
import type { ScrapsRepository } from '@/repositories/scraps-repository'

interface FetchUserScrapsUseCaseRequest {
  userId: string
}

interface FetchUserScrapsUseCaseResponse {
  scraps: Scrap[]
}

export class FetchUserScrapsUseCase {
  constructor(private scrapsRepository: ScrapsRepository) {}

  async execute({
    userId,
  }: FetchUserScrapsUseCaseRequest): Promise<FetchUserScrapsUseCaseResponse> {
    const scraps = await this.scrapsRepository.findManyByRecipientId(userId)

    return { scraps }
  }
}
