import { Controller, HttpCode, Param, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { SentConnectionRequestUseCase } from '@/use-cases/connections/sent-connection-request'

@Controller('/connections/request/:userId')
export class SendConnectionRequestController {
  constructor(private sendConnection: SentConnectionRequestUseCase) {}

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
