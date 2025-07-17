import { Controller, Get, Param } from '@nestjs/common'
import { FindUserByIdUseCase } from '@/use-cases/users/find-user-by-id'

@Controller('/users/:userId')
export class GetUserByIdController {
  constructor(private findUserById: FindUserByIdUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const { user: currentUser } = await this.findUserById.execute({
      userId,
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
