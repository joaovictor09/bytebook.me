import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { Public } from '@/infra/auth/public'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate'
import { Response } from 'express'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Public()
@Controller('/sessions')
export class AuthenticateController {
  constructor(private readonly authenticate: AuthenticateUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(
    @Body() body: AuthenticateBodySchema,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body

    const result = await this.authenticate.execute({
      email,
      password,
    })

    const accessToken = result.accessToken

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 dia
    })

    return { access_token: accessToken }
  }
}
