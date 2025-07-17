import { Controller, Delete, Param, ForbiddenException } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { LeaveCommunityUseCase } from '@/use-cases/communities/leave-community'

@Controller('/communities/:communityId/leave')
export class LeaveCommunityController {
  constructor(private leaveCommunity: LeaveCommunityUseCase) {}

  @Delete()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('communityId') communityId: string,
  ) {
    try {
      await this.leaveCommunity.execute({
        communityId,
        userId: user.sub,
      })
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Owner cannot leave')
      ) {
        throw new ForbiddenException('Owner cannot leave the community')
      }
      throw error
    }
  }
}
