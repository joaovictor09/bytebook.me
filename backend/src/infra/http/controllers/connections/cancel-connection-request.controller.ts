import { Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CancelConnectionRequestUseCase } from '@/use-cases/connections/cancel-connection-request'

@Controller('/connections/:connectionId/cancel')
export class CancelConnectionRequestController {
  constructor(private cancelConnection: CancelConnectionRequestUseCase) {}

  @Patch()
  @HttpCode(201)
  async handle(
    @Param('connectionId') connectionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    await this.cancelConnection.execute({
      connectionId,
      userId: user.sub,
    })
  }
}
