import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { RegisterUserUseCase } from '@/use-cases/users/register-user'

const createAccountBodySchema = z.object({
  name: z.string(),
  username: z.string().min(4),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Public()
@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, username, password } = body

    await this.registerUser.execute({
      name,
      username,
      password,
    })
  }
}
