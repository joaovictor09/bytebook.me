import { Controller, Delete, Param } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteScrapCommentUseCase } from '@/use-cases/scraps/delete-scrap-comment'

@Controller('/scraps/comments/:commentId')
export class DeleteScrapCommentController {
  constructor(private deleteScrapComment: DeleteScrapCommentUseCase) {}

  @Delete()
  async handle(
    @Param('commentId') commentId: string,
    @CurrentUser() user: UserPayload,
  ) {
    await this.deleteScrapComment.execute({
      scrapCommentId: commentId,
      userId: user.sub,
    })
  }
}
