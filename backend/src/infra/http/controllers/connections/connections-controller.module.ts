import { FetchUserConnectionsUseCase } from '@/use-cases/connections/fetch-user-connections'
import { SendConnectionRequestUseCase } from '@/use-cases/connections/send-connection-request'
import { FetchConnectionsController } from './fetch-connections.controller'
import { SendConnectionRequestController } from './send-connection-request.controller'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { AcceptConnectionRequestController } from './accept-connection-request.controller'
import { AcceptConnectionRequestUseCase } from '@/use-cases/connections/accept-connection-request'
import { CancelConnectionRequestController } from './cancel-connection-request.controller'
import { CancelConnectionRequestUseCase } from '@/use-cases/connections/cancel-connection-request'
import { DeclineConnectionRequestController } from './decline-connection-request.controller'
import { DeclineConnectionRequestUseCase } from '@/use-cases/connections/decline-connection-request'
import { RemoveConnectionController } from './remove-connection.controller'
import { RemoveConnectionUseCase } from '@/use-cases/connections/remove-connection'

@Module({
  imports: [DatabaseModule],
  controllers: [
    SendConnectionRequestController,
    FetchConnectionsController,
    AcceptConnectionRequestController,
    CancelConnectionRequestController,
    DeclineConnectionRequestController,
    RemoveConnectionController,
  ],
  providers: [
    SendConnectionRequestUseCase,
    FetchUserConnectionsUseCase,
    AcceptConnectionRequestUseCase,
    CancelConnectionRequestUseCase,
    DeclineConnectionRequestUseCase,
    RemoveConnectionUseCase,
  ],
})
export class ConnectionsControllerModule {}
