import { User } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface FindUserByIdUseCaseRequest {
  userId: string
}

interface FindUserByIdUseCaseResponse {
  user: User
}

@Injectable()
export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
