import { TopicCommentsRepository } from '@/repositories/topic-comments-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma, TopicComment } from '@prisma/client'

@Injectable()
export class PrismaTopicCommentsRepository implements TopicCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.TopicCommentUncheckedCreateInput,
  ): Promise<TopicComment> {
    return await this.prisma.topicComment.create({
      data,
    })
  }

  async findById(commentId: string): Promise<TopicComment | null> {
    return await this.prisma.topicComment.findUnique({
      where: {
        id: commentId,
      },
    })
  }

  async findManyByTopicId(topicId: string): Promise<TopicComment[]> {
    return await this.prisma.topicComment.findMany({
      where: {
        topicId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.topicComment.delete({
      where: {
        id,
      },
    })
  }
}
