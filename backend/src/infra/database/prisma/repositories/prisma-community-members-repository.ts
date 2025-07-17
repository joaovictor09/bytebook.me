import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import {
  CommunityMembersRepository,
  CommunityMemberWithUser,
} from '@/repositories/community-members-repository'
import { Prisma, CommunityMember } from '@prisma/client'

@Injectable()
export class PrismaCommunityMembersRepository
  implements CommunityMembersRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.CommunityMemberUncheckedCreateInput,
  ): Promise<CommunityMember> {
    return await this.prisma.communityMember.create({
      data,
    })
  }

  async findByUserAndCommunity(
    userId: string,
    communityId: string,
  ): Promise<CommunityMember | null> {
    return await this.prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          // conforme o @@unique([communityId, userId]) no schema
          communityId,
          userId,
        },
      },
    })
  }

  async findManyByUserId(userId: string): Promise<CommunityMember[]> {
    return await this.prisma.communityMember.findMany({
      where: {
        userId,
      },
    })
  }

  async findManyByCommunityId(
    communityId: string,
  ): Promise<CommunityMemberWithUser[]> {
    return await this.prisma.communityMember.findMany({
      where: {
        communityId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  async deleteByUserAndCommunity(
    userId: string,
    communityId: string,
  ): Promise<void> {
    await this.prisma.communityMember.delete({
      where: {
        communityId_userId: {
          communityId,
          userId,
        },
      },
    })
  }
}
