import { UserAlreadyExistsError } from '../_errors/user-already-exists-error'
import { HashGenerator } from '@/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/repositories/users-repository'
import { Either, left, right } from '@/utils/either'
import { UserDto } from '@/dtos/users.dto'

interface RegisterUserUseCaseRequest {
  name: string
  username: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: UserDto
  }
>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: HashGenerator,
  ) {}

  async execute({
    username,
    name,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const passwordHash = await this.hasher.hash(password)

    const userWithSameUsername =
      await this.usersRepository.findByUsername(username)

    if (userWithSameUsername) {
      return left(new UserAlreadyExistsError())
    }

    const user = await this.usersRepository.create({
      username,
      name,
      passwordHash,
    })

    return right({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    })
  }
}
