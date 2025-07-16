import type { ScrapComment, Prisma } from '@prisma/client'

export interface ScrapCommentsRepository {
  create(data: Prisma.ScrapCommentUncheckedCreateInput): Promise<ScrapComment>
  findById(id: string): Promise<ScrapComment | null>
  findManyByScrapId(scrapId: string): Promise<ScrapComment[]>
  delete(id: string): Promise<void>
}
