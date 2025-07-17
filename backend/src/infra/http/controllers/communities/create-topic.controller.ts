import {
  Body,
  Controller,
  Param,
  Post,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateTopicUseCase } from '@/use-cases/communities/create-topic'

const createTopicBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateTopicBodySchema = z.infer<typeof createTopicBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createTopicBodySchema)

@Controller('/communities/:communityId/topics')
export class CreateTopicController {
  constructor(private createTopic: CreateTopicUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateTopicBodySchema,
    @Param('communityId') communityId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, title } = body

    try {
      const { topic } = await this.createTopic.execute({
        communityId,
        content,
        title,
        userId: user.sub,
      })

      return {
        topic,
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          throw new ForbiddenException('Not allowed to create topic')
        }
        if (
          error.name === 'ResourceNotFoundError' ||
          error.message.includes('not found')
        ) {
          throw new NotFoundException('Community not found')
        }
      }
      throw error
    }
  }
}
