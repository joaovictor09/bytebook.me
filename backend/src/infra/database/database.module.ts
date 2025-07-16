import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

import { UsersRepository } from '@/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

import { ConnectionsRepository } from '@/repositories/connections-repository'
import { PrismaConnectionsRepository } from './prisma/repositories/prisma-connections-repository'

import { ScrapsRepository } from '@/repositories/scraps-repository'
import { PrismaScrapsRepository } from './prisma/repositories/prisma-scraps-repository'

import { ScrapCommentsRepository } from '@/repositories/scrap-comments-repository'
import { PrismaScrapCommentsRepository } from './prisma/repositories/prisma-scrap-comments-repository'

import { CommunitiesRepository } from '@/repositories/communities-repository'
import { PrismaCommunitiesRepository } from './prisma/repositories/prisma-communities-repository'

import { CommunityMembersRepository } from '@/repositories/community-members-repository'
import { PrismaCommunityMembersRepository } from './prisma/repositories/prisma-community-members-repository'

import { TopicsRepository } from '@/repositories/topics-repository'
import { PrismaTopicsRepository } from './prisma/repositories/prisma-topics-repository'

import { TopicCommentsRepository } from '@/repositories/topic-comments-repository'
import { PrismaTopicCommentsRepository } from './prisma/repositories/prisma-topic-comments-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: ConnectionsRepository, useClass: PrismaConnectionsRepository },
    { provide: ScrapsRepository, useClass: PrismaScrapsRepository },
    {
      provide: ScrapCommentsRepository,
      useClass: PrismaScrapCommentsRepository,
    },
    { provide: CommunitiesRepository, useClass: PrismaCommunitiesRepository },
    {
      provide: CommunityMembersRepository,
      useClass: PrismaCommunityMembersRepository,
    },
    { provide: TopicsRepository, useClass: PrismaTopicsRepository },
    {
      provide: TopicCommentsRepository,
      useClass: PrismaTopicCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ConnectionsRepository,
    ScrapsRepository,
    ScrapCommentsRepository,
    CommunitiesRepository,
    CommunityMembersRepository,
    TopicsRepository,
    TopicCommentsRepository,
  ],
})
export class DatabaseModule {}
