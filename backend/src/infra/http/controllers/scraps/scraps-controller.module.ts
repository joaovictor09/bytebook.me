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

@Module({
  imports: [DatabaseModule],
  controllers: [
    SendScrapController,
    DeleteScrapController,
    CommentScrapController,
    DeleteScrapCommentController,
  ],
  providers: [
    SendScrapUseCase,
    CommentScrapUseCase,
    DeleteScrapUseCase,
    DeleteScrapCommentUseCase,
  ],
})
export class ScrapsControllerModule {}
