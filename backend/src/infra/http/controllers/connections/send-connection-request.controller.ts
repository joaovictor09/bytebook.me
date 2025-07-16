import { Controller, HttpCode, Param, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { SendConnectionRequestUseCase } from '@/use-cases/connections/send-connection-request'

@Controller('/connections/request/send/:userId')
export class SendConnectionRequestController {
  constructor(private sendConnection: SendConnectionRequestUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const response = await this.sendConnection.execute({
      senderId: user.sub,
      recipientId: userId,
    })

    return {
      connection: response.connection,
    }
  }
}
