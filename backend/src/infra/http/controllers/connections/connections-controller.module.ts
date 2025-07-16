import { FetchUserConnectionsUseCase } from '@/use-cases/connections/fetch-user-connections'
import { SentConnectionRequestUseCase } from '@/use-cases/connections/sent-connection-request'
import { FetchUserConnectionsController } from './fetch-user-connections.controller'
import { SendConnectionRequestController } from './send-connection-request.controller'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { AcceptConnectionRequestController } from './accept-connection-request.controller'
import { AcceptConnectionRequestUseCase } from '@/use-cases/connections/accept-connection-request'

@Module({
  imports: [DatabaseModule],
  controllers: [
    SendConnectionRequestController,
    FetchUserConnectionsController,
    AcceptConnectionRequestController,
  ],
  providers: [
    SentConnectionRequestUseCase,
    FetchUserConnectionsUseCase,
    AcceptConnectionRequestUseCase,
  ],
})
export class ConnectionsControllerModule {}
