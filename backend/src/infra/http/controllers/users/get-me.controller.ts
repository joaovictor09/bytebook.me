import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FindUserByIdUseCase } from '@/use-cases/users/find-user-by-id'

@Controller('/me')
export class GetMeController {
  constructor(private findUserById: FindUserByIdUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const { user: currentUser } = await this.findUserById.execute({
      userId: user.sub,
    })

    return {
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        // Não inclua passwordHash ou dados sensíveis
      },
    }
  }
}
