import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { UsersControllerModule } from './controllers/users/users-controller.module'
import { ConnectionsControllerModule } from './controllers/connections/connections-controller.module'
import { ScrapsControllerModule } from './controllers/scraps/scraps-controller.module'
import { CommunitiesControllerModule } from './controllers/communities/communities-controller.module'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    UsersControllerModule,
    ConnectionsControllerModule,
    ScrapsControllerModule,
    CommunitiesControllerModule,
  ],
  exports: [DatabaseModule, CryptographyModule],
})
export class HttpModule {}
