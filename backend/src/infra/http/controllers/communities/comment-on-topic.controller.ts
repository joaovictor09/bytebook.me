import { Body, Controller, Param, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateTopicCommentUseCase } from '@/use-cases/communities/create-topic-comment'

const createTopicCommentBodySchema = z.object({
  message: z.string(),
})

type CreateTopicCommentBodySchema = z.infer<typeof createTopicCommentBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createTopicCommentBodySchema)

@Controller('/topics/:topicId/comments')
export class CommentOnTopicController {
  constructor(private createTopicComment: CreateTopicCommentUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateTopicCommentBodySchema,
    @Param('topicId') topicId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { message } = body

    const { topicComment } = await this.createTopicComment.execute({
      topicId,
      message,
      userId: user.sub,
    })

    return {
      topicComment,
    }
  }
}
