import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { SendScrapController } from './send-scrap.controller'
import { SendScrapUseCase } from '@/use-cases/scraps/send-scrap'
import { CommentScrapController } from './comment-scrap.controller'
import { CommentScrapUseCase } from '@/use-cases/scraps/comment-scrap'
import { DeleteScrapController } from './delete-scrap.controller'
import { DeleteScrapUseCase } from '@/use-cases/scraps/delete-scrap'
import { DeleteScrapCommentController } from './delete-scrap-comment.controller'
import { DeleteScrapCommentUseCase } from '@/use-cases/scraps/delete-scrap-comment'
import { FetchUserScrapsController } from './fetch-user-scraps.controller'
import { FetchUserScrapsUseCase } from '@/use-cases/scraps/fetch-user-scraps'
import { FetchScrapCommentsController } from './fetch-scrap-comments.controller'
import { FetchScrapCommentsUseCase } from '@/use-cases/scraps/fetch-scrap-comments'

@Module({
  imports: [DatabaseModule],
  controllers: [
    SendScrapController,
    DeleteScrapController,
    CommentScrapController,
    DeleteScrapCommentController,
    FetchUserScrapsController,
    FetchScrapCommentsController,
  ],
  providers: [
    SendScrapUseCase,
    CommentScrapUseCase,
    DeleteScrapUseCase,
    DeleteScrapCommentUseCase,
    FetchUserScrapsUseCase,
    FetchScrapCommentsUseCase,
  ],
})
export class ScrapsControllerModule {}
