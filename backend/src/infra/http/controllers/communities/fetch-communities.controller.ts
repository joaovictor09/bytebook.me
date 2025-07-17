import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FetchUserCommunitiesUseCase } from '@/use-cases/communities/fetch-user-communities'
import { Controller, Get } from '@nestjs/common'

@Controller('/communities')
export class FetchCommunitiesController {
  constructor(private fetchUserCommunities: FetchUserCommunitiesUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const { communities } = await this.fetchUserCommunities.execute({
      userId: user.sub,
    })

    return {
      communities,
    }
  }
}
