import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { FindUserByUsernameUseCase } from '@/use-cases/users/find-user-by-username'

@Controller('/users/:username')
export class GetUserByUsernameController {
  constructor(private findByUsername: FindUserByUsernameUseCase) {}

  @Get()
  async handle(@Param('username') username: string) {
    const result = await this.findByUsername.execute({
      username,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value
  }
}
