import { Controller, Get, Param } from '@nestjs/common'
import { FetchUserConnectionsUseCase } from '@/use-cases/connections/fetch-user-connections'

@Controller('/users/:userId/connections')
export class FetchUserConnectionsController {
  constructor(private fetchUserConnections: FetchUserConnectionsUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const response = await this.fetchUserConnections.execute({
      userId,
      status: 'ACCEPTED',
    })

    return {
      connections: response.connections,
    }
  }
}
