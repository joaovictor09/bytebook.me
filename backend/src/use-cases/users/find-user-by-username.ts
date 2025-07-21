import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { Either, left, right } from '@/utils/either'
import { UserDto } from '@/dtos/users.dto'

interface FindUserByUsernameUseCaseRequest {
  username: string
}

type FindUserByUsernameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: UserDto
  }
>

@Injectable()
export class FindUserByUsernameUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
  }: FindUserByUsernameUseCaseRequest): Promise<FindUserByUsernameUseCaseResponse> {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    })
  }
}
