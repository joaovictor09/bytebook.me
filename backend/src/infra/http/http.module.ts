import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'

import { RegisterUserUseCase } from '@/use-cases/users/register-user'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate'
import { SendConnectionRequestController } from './controllers/send-connection-request.controller'
import { SentConnectionRequestUseCase } from '@/use-cases/connections/sent-connection-request'
import { FetchUserConnectionsController } from './controllers/fetch-user-connections.controller'
import { FetchUserConnectionsUseCase } from '@/use-cases/connections/fetch-user-connections'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    SendConnectionRequestController,
    FetchUserConnectionsController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUseCase,
    SentConnectionRequestUseCase,
    FetchUserConnectionsUseCase,
  ],
})
export class HttpModule {}
