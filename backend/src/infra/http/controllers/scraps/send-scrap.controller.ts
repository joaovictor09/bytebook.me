import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { SendScrapUseCase } from '@/use-cases/scraps/send-scrap'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const sendScrapBodySchema = z.object({
  message: z.string(),
})

type SendScrapBodySchema = z.infer<typeof sendScrapBodySchema>

const bodyValidationPipe = new ZodValidationPipe(sendScrapBodySchema)

@Controller('/scraps/send/:userId')
export class SendScrapController {
  constructor(private sendScrap: SendScrapUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('userId') userId: string,
    @Body(bodyValidationPipe) body: SendScrapBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { message } = body

    const response = await this.sendScrap.execute({
      message,
      recipientId: userId,
      senderId: user.sub,
    })

    return {
      scrap: response.scrap,
    }
  }
}
