import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FetchUserConnectionsUseCase } from '@/use-cases/connections/fetch-user-connections'

@Controller('/connections')
export class FetchConnectionsController {
  constructor(private fetchUserConnections: FetchUserConnectionsUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const response = await this.fetchUserConnections.execute({
      userId: user.sub,
      status: 'ACCEPTED',
    })

    return {
      connections: response.connections,
    }
  }
}
