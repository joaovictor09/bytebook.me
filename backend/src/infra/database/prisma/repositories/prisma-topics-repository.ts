import { TopicsRepository } from '@/repositories/topics-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma, Topic } from '@prisma/client'

@Injectable()
export class PrismaTopicsRepository implements TopicsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TopicUncheckedCreateInput): Promise<Topic> {
    return await this.prisma.topic.create({
      data,
    })
  }

  async save(topic: Topic): Promise<Topic> {
    return await this.prisma.topic.update({
      where: { id: topic.id },
      data: {
        title: topic.title,
        content: topic.content,
      },
    })
  }

  async findById(id: string): Promise<Topic | null> {
    return await this.prisma.topic.findUnique({
      where: { id },
    })
  }

  async findManyByCommunityId(communityId: string): Promise<Topic[]> {
    return await this.prisma.topic.findMany({
      where: { communityId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.topic.delete({
      where: { id },
    })
  }
}
