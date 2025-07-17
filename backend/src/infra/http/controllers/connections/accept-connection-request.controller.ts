import { Controller, HttpCode, Param, Patch } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AcceptConnectionRequestUseCase } from '@/use-cases/connections/accept-connection-request'

@Controller('/connections/:connectionId/accept')
export class AcceptConnectionRequestController {
  constructor(private acceptConnection: AcceptConnectionRequestUseCase) {}

  @Patch()
  @HttpCode(201)
  async handle(
    @Param('connectionId') connectionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const response = await this.acceptConnection.execute({
      userId: user.sub,
      connectionId,
    })

    return {
      connection: response.connection,
    }
  }
}
