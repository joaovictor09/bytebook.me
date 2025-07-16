import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateCommunityController } from './create-community.controller'
import { CreateCommunityUseCase } from '@/use-cases/communities/create-community'
import { SearchCommunitiesController } from './search-communities.controller'
import { SearchCommunitiesUseCase } from '@/use-cases/communities/search-communities'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCommunityController, SearchCommunitiesController],
  providers: [CreateCommunityUseCase, SearchCommunitiesUseCase],
})
export class CommunitiesControllerModule {}
