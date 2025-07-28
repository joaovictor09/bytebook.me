import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { Either, left, right } from '@/utils/either'
import { UserDetailDTO } from '@/dtos/users.dto'
import { CommunitiesRepository } from '@/repositories/communities-repository'
import { ScrapsRepository } from '@/repositories/scraps-repository'
import { ConnectionsRepository } from '@/repositories/connections-repository'

interface GetUserDetailsByUsernameRequest {
  username: string
}

type GetUserDetailsByUsernameResponse = Either<
  ResourceNotFoundError,
  {
    user: UserDetailDTO
  }
>

@Injectable()
export class GetUserDetailsByUsername {
  constructor(
    private usersRepository: UsersRepository,
    private communitiesRepository: CommunitiesRepository,
    private scrapsRepository: ScrapsRepository,
    private connectionsRepository: ConnectionsRepository,
  ) {}

  async execute({
    username,
  }: GetUserDetailsByUsernameRequest): Promise<GetUserDetailsByUsernameResponse> {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const communities: number = await this.communitiesRepository.countByUserId(
      user.id,
    )
    const scraps: number = await this.scrapsRepository.countByUserId(user.id)
    const connections: number =
      await this.connectionsRepository.countActiveByUserId(user.id)

    return right({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        location: user.location,
        title: user.title,
        memberSince: user.created_at,
        communities,
        connections,
        scraps,
      },
    })
  }
}
