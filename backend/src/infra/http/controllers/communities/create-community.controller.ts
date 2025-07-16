import { Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CreateCommunityUseCase } from '@/use-cases/communities/create-community'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createCommunityBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

type CreateCommunityBodySchema = z.infer<typeof createCommunityBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createCommunityBodySchema)

@Controller('/communities')
export class CreateCommunityController {
  constructor(private createCommunity: CreateCommunityUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateCommunityBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { description, name } = body

    const { community } = await this.createCommunity.execute({
      name,
      description,
      userId: user.sub,
    })

    return {
      community,
    }
  }
}
