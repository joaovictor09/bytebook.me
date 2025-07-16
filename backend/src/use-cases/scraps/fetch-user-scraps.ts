import { Scrap } from '@prisma/client'
import { ScrapsRepository } from '@/repositories/scraps-repository'
import { Injectable } from '@nestjs/common'

interface FetchUserScrapsUseCaseRequest {
  userId: string
}

interface FetchUserScrapsUseCaseResponse {
  scraps: Scrap[]
}

@Injectable()
export class FetchUserScrapsUseCase {
  constructor(private scrapsRepository: ScrapsRepository) {}

  async execute({
    userId,
  }: FetchUserScrapsUseCaseRequest): Promise<FetchUserScrapsUseCaseResponse> {
    const scraps = await this.scrapsRepository.findManyByRecipientId(userId)

    return { scraps }
  }
}
