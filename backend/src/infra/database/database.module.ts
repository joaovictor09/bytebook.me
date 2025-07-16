import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { PrismaConnectionsRepository } from './prisma/repositories/prisma-connections-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ConnectionsRepository,
      useClass: PrismaConnectionsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, ConnectionsRepository],
})
export class DatabaseModule {}
