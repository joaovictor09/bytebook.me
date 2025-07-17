import { Controller, Delete, Param } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { RemoveConnectionUseCase } from '@/use-cases/connections/remove-connection'

@Controller('/connections/:connectionId')
export class RemoveConnectionController {
  constructor(private removeConnection: RemoveConnectionUseCase) {}

  @Delete()
  async handle(
    @Param('connectionId') connectionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    await this.removeConnection.execute({
      connectionId,
      userId: user.sub,
    })
  }
}
