import { Controller, Get, Param } from '@nestjs/common'
import { FetchUserScrapsUseCase } from '@/use-cases/scraps/fetch-user-scraps'

@Controller('/scraps/:userId')
export class FetchUserScrapsController {
  constructor(private fetchUserScraps: FetchUserScrapsUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const { scraps } = await this.fetchUserScraps.execute({
      userId,
    })

    return {
      scraps,
    }
  }
}
