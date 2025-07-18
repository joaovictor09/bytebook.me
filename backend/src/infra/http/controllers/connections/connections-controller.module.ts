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
import { FetchReceivedConnectionsController } from './fetch-received-connections-request.controller'
import { FetchSentConnectionsController } from './fetch-sent-connections-request.controller'
import { FetchUserConnectionsController } from './fetch-user-connections.controller'
import { GetConnectionStatusController } from './get-connection-status.controller'
import { GetConnectionStatusUseCase } from '@/use-cases/connections/get-connection-status'

@Module({
  imports: [DatabaseModule],
  controllers: [
    FetchConnectionsController,
    FetchReceivedConnectionsController,
    FetchSentConnectionsController,
    FetchUserConnectionsController,
    SendConnectionRequestController,
    AcceptConnectionRequestController,
    CancelConnectionRequestController,
    DeclineConnectionRequestController,
    RemoveConnectionController,
    GetConnectionStatusController,
  ],
  providers: [
    SendConnectionRequestUseCase,
    FetchUserConnectionsUseCase,
    AcceptConnectionRequestUseCase,
    CancelConnectionRequestUseCase,
    DeclineConnectionRequestUseCase,
    RemoveConnectionUseCase,
    GetConnectionStatusUseCase,
  ],
})
export class ConnectionsControllerModule {}
