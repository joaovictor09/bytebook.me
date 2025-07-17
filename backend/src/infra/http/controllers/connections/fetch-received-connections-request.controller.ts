import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FetchUserConnectionsUseCase } from '@/use-cases/connections/fetch-user-connections'

@Controller('/connections/pending/received')
export class FetchReceivedConnectionsController {
  constructor(private fetchUserConnections: FetchUserConnectionsUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const response = await this.fetchUserConnections.execute({
      userId: user.sub,
      status: 'PENDING',
      direction: 'RECEIVED',
    })

    return {
      connections: response.connections,
    }
  }
}
