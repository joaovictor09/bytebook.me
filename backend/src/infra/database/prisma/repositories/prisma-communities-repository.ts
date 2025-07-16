import { CommunitiesRepository } from '@/repositories/communities-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma, Community } from '@prisma/client'

@Injectable()
export class PrismaCommunitiesRepository implements CommunitiesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CommunityUncheckedCreateInput): Promise<Community> {
    return await this.prisma.community.create({
      data,
    })
  }

  async findAll(): Promise<Community[]> {
    return await this.prisma.community.findMany()
  }

  async findById(id: string): Promise<Community | null> {
    return await this.prisma.community.findUnique({
      where: { id },
    })
  }

  async findManyByName(name: string): Promise<Community[]> {
    return await this.prisma.community.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive', // busca case-insensitive
        },
      },
    })
  }

  async findManyByUserId(userId: string): Promise<Community[]> {
    // Busca comunidades onde o user é membro
    return await this.prisma.community.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    })
  }

  async incrementMemberCount(id: string): Promise<void> {
    await this.prisma.community.update({
      where: { id },
      data: {
        memberCount: {
          increment: 1,
        },
      },
    })
  }

  async decrementMemberCount(id: string): Promise<void> {
    await this.prisma.community.update({
      where: { id },
      data: {
        memberCount: {
          decrement: 1,
        },
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.community.delete({
      where: { id },
    })
  }
}
