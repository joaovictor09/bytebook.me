import { Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeclineConnectionRequestUseCase } from '@/use-cases/connections/decline-connection-request'

@Controller('/connections/:connectionId/decline')
export class DeclineConnectionRequestController {
  constructor(private declineConnection: DeclineConnectionRequestUseCase) {}

  @Patch()
  @HttpCode(201)
  async handle(
    @Param('connectionId') connectionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    await this.declineConnection.execute({
      connectionId,
      userId: user.sub,
    })
  }
}
