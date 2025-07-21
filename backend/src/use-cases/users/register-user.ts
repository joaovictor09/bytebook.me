import { UserAlreadyExistsError } from '../_errors/user-already-exists-error'
import { User } from '@prisma/client'
import { HashGenerator } from '@/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUserUseCaseRequest {
  name: string
  username: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

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
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      username,
      name,
      passwordHash,
    })

    return { user }
  }
}
