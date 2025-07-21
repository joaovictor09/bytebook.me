import { ScrapsRepository } from '@/repositories/scraps-repository'
import { Injectable } from '@nestjs/common'
import { ScrapWithSenderDTO } from '@/dtos/scraps.dto'

interface FetchUserScrapsUseCaseRequest {
  userId: string
}

interface FetchUserScrapsUseCaseResponse {
  scraps: ScrapWithSenderDTO[]
}

@Injectable()
export class FetchUserScrapsUseCase {
  constructor(private scrapsRepository: ScrapsRepository) {}

  async execute({
    userId,
  }: FetchUserScrapsUseCaseRequest): Promise<FetchUserScrapsUseCaseResponse> {
    const scraps =
      await this.scrapsRepository.findManyWithSenderByRecipientId(userId)

    return { scraps }
  }
}
