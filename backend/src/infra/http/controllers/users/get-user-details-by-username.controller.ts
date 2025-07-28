import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { GetUserDetailsByUsername } from '@/use-cases/users/get-user-details-by-username'

@Controller('/users/:username/details')
export class GetUserDetailsByUsernameController {
  constructor(private getUserDetailsByUsername: GetUserDetailsByUsername) {}

  @Get()
  async handle(@Param('username') username: string) {
    const result = await this.getUserDetailsByUsername.execute({
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
