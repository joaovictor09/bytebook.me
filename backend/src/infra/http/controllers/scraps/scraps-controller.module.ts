import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { SendScrapController } from './send-scrap.controller'
import { SendScrapUseCase } from '@/use-cases/scraps/send-scrap'

@Module({
  imports: [DatabaseModule],
  controllers: [SendScrapController],
  providers: [SendScrapUseCase],
})
export class ScrapsControllerModule {}
