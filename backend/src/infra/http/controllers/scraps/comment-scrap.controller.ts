import { Body, Controller, Param, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CommentScrapUseCase } from '@/use-cases/scraps/comment-scrap'

const commentScrapBodySchema = z.object({
  message: z.string(),
})

type CommentScrapBodySchema = z.infer<typeof commentScrapBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentScrapBodySchema)

@Controller('/scraps/:scrapId/comment')
export class CommentScrapController {
  constructor(private commentScrap: CommentScrapUseCase) {}

  @Post()
  async handle(
    @Param('scrapId') scrapId: string,
    @Body(bodyValidationPipe) body: CommentScrapBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { message } = body

    const response = await this.commentScrap.execute({
      message,
      scrapId,
      senderId: user.sub,
    })

    return {
      comment: response.comment,
    }
  }
}
