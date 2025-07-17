import { Controller, Param, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JoinCommunityUseCase } from '@/use-cases/communities/join-community'

@Controller('/communities/:communityId/join')
export class JoinCommunityController {
  constructor(private joinCommunity: JoinCommunityUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('communityId') communityId: string,
  ) {
    const { communityMember } = await this.joinCommunity.execute({
      communityId,
      userId: user.sub,
    })

    return {
      communityMember,
    }
  }
}
