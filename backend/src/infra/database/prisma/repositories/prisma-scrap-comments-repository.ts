import { ScrapCommentsRepository } from '@/repositories/scrap-comments-repository'
import { Prisma, ScrapComment } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaScrapCommentsRepository implements ScrapCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.ScrapCommentUncheckedCreateInput,
  ): Promise<ScrapComment> {
    return await this.prisma.scrapComment.create({ data })
  }

  async findById(id: string): Promise<ScrapComment | null> {
    return await this.prisma.scrapComment.findUnique({ where: { id } })
  }

  async findManyByScrapId(scrapId: string): Promise<ScrapComment[]> {
    return await this.prisma.scrapComment.findMany({ where: { scrapId } })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.scrapComment.delete({ where: { id } })
  }
}
