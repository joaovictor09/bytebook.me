import { Controller, HttpCode, Param, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AcceptConnectionRequestUseCase } from '@/use-cases/connections/accept-connection-request'

@Controller('/connections/request/accept/:connectionId')
export class AcceptConnectionRequestController {
  constructor(private acceptConnection: AcceptConnectionRequestUseCase) {}

  @Post()
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
