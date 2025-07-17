import { FetchUserCommunitiesUseCase } from '@/use-cases/communities/fetch-user-communities'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('/users/:userId/communities')
export class FetchUserJoinedCommunitiesController {
  constructor(private fetchUserCommunities: FetchUserCommunitiesUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const { communities } = await this.fetchUserCommunities.execute({
      userId,
    })

    return {
      communities,
    }
  }
}
