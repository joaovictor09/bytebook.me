import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { SendScrapController } from './send-scrap.controller'
import { SendScrapUseCase } from '@/use-cases/scraps/send-scrap'
import { CommentScrapController } from './comment-scrap.controller'
import { CommentScrapUseCase } from '@/use-cases/scraps/comment-scrap'

@Module({
  imports: [DatabaseModule],
  controllers: [SendScrapController, CommentScrapController],
  providers: [SendScrapUseCase, CommentScrapUseCase],
})
export class ScrapsControllerModule {}
