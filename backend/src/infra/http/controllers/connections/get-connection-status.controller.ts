import { Controller, Get, Param } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { GetConnectionStatusUseCase } from '@/use-cases/connections/get-connection-status'

@Controller('/connections/:userId/status')
export class GetConnectionStatusController {
  constructor(private getConnectionStatus: GetConnectionStatusUseCase) {}

  @Get()
  async handle(
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { status } = await this.getConnectionStatus.execute({
      userAId: user.sub,
      userBId: userId,
    })

    return {
      status,
    }
  }
}
