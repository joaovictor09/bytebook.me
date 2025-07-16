import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FetchUserConnectionsUseCase } from '@/use-cases/connections/fetch-user-connections'

@Controller('/connections/request')
export class FetchUserConnectionsController {
  constructor(private fetchUserConnections: FetchUserConnectionsUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const response = await this.fetchUserConnections.execute({
      userId: user.sub,
    })

    return {
      connections: response.connections,
    }
  }
}
