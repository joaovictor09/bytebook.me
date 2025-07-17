import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'

// Controllers
import { CreateCommunityController } from './create-community.controller'
import { SearchCommunitiesController } from './search-communities.controller'
import { LeaveCommunityController } from './leave-community.controller'
import { JoinCommunityController } from './join-community.controller'
import { FetchUserJoinedCommunitiesController } from './fetch-user-joined-communities.controller'
import { FetchCommunityMembersController } from './fetch-community-members.controller'
import { FetchCommunityTopicsController } from './fetch-community-topics.controller'
import { FetchTopicCommentsTopicsController } from './fetch-topic-comments.controller'
import { CreateTopicController } from './create-topic.controller'
// (comment-on-topic.controller não incluso pois está vazio)

// Use Cases
import { CreateCommunityUseCase } from '@/use-cases/communities/create-community'
import { SearchCommunitiesUseCase } from '@/use-cases/communities/search-communities'
import { LeaveCommunityUseCase } from '@/use-cases/communities/leave-community'
import { JoinCommunityUseCase } from '@/use-cases/communities/join-community'
import { FetchUserCommunitiesUseCase } from '@/use-cases/communities/fetch-user-communities'
import { FetchCommunityMembersUseCase } from '@/use-cases/communities/fetch-community-members'
import { FetchCommunityTopicsUseCase } from '@/use-cases/communities/fetch-community-topics'
import { FetchTopicCommentsUseCase } from '@/use-cases/communities/fetch-topic-comments'
import { GetTopicDetailsUseCase } from '@/use-cases/communities/get-topic-details'
import { GetCommunityDetailsUseCase } from '@/use-cases/communities/get-community-details'
import { CreateTopicUseCase } from '@/use-cases/communities/create-topic'
import { GetTopicDetailsController } from './get-topic-details.controller'
import { GetCommunityDetailsController } from './get-community-details.controller'
import { CommentOnTopicController } from './comment-on-topic.controller'
import { CreateTopicCommentUseCase } from '@/use-cases/communities/create-topic-comment'
import { FetchCommunitiesController } from './fetch-communities.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCommunityController,
    SearchCommunitiesController,
    LeaveCommunityController,
    JoinCommunityController,
    FetchUserJoinedCommunitiesController,
    FetchCommunityMembersController,
    FetchCommunityTopicsController,
    FetchTopicCommentsTopicsController,
    GetTopicDetailsController,
    GetCommunityDetailsController,
    CreateTopicController,
    CommentOnTopicController,
    FetchCommunitiesController,
  ],
  providers: [
    CreateCommunityUseCase,
    SearchCommunitiesUseCase,
    LeaveCommunityUseCase,
    JoinCommunityUseCase,
    FetchUserCommunitiesUseCase,
    FetchCommunityMembersUseCase,
    FetchCommunityTopicsUseCase,
    FetchTopicCommentsUseCase,
    GetTopicDetailsUseCase,
    GetCommunityDetailsUseCase,
    CreateTopicUseCase,
    CreateTopicCommentUseCase,
  ],
})
export class CommunitiesControllerModule {}
