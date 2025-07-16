import { Controller, Delete, Param } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteScrapUseCase } from '@/use-cases/scraps/delete-scrap'

@Controller('/scraps/:scrapId')
export class DeleteScrapController {
  constructor(private deleteScrap: DeleteScrapUseCase) {}

  @Delete()
  async handle(
    @Param('scrapId') scrapId: string,
    @CurrentUser() user: UserPayload,
  ) {
    await this.deleteScrap.execute({
      scrapId,
      userId: user.sub,
    })
  }
}
