import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { ConnectionsRepository } from '@/repositories/connections-repository'
import { PrismaConnectionsRepository } from './prisma/repositories/prisma-connections-repository'
import { ScrapsRepository } from '@/repositories/scraps-repository'
import { PrismaScrapsRepository } from './prisma/repositories/prisma-scraps-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: ConnectionsRepository, useClass: PrismaConnectionsRepository },
    { provide: ScrapsRepository, useClass: PrismaScrapsRepository },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ConnectionsRepository,
    ScrapsRepository,
  ],
})
export class DatabaseModule {}
