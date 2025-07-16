import { randomUUID } from 'node:crypto'
import type { ScrapComment, Prisma } from '@prisma/client'
import type { ScrapCommentsRepository } from '@/repositories/scrap-comments-repository'

export class InMemoryScrapCommentsRepository
  implements ScrapCommentsRepository
{
  public items: ScrapComment[] = []

  async create(
    data: Prisma.ScrapCommentUncheckedCreateInput,
  ): Promise<ScrapComment> {
    const comment: ScrapComment = {
      id: randomUUID(),
      scrapId: data.scrapId,
      senderId: data.senderId,
      message: data.message,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(comment)
    return comment
  }

  async findById(id: string): Promise<ScrapComment | null> {
    return this.items.find((c) => c.id === id) ?? null
  }

  async findManyByScrapId(scrapId: string): Promise<ScrapComment[]> {
    return this.items.filter((c) => c.scrapId === scrapId)
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((c) => c.id === id)
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }
}
