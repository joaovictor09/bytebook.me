import type { ScrapComment, Prisma } from '@prisma/client'

export abstract class ScrapCommentsRepository {
  abstract create(
    data: Prisma.ScrapCommentUncheckedCreateInput,
  ): Promise<ScrapComment>

  abstract findById(id: string): Promise<ScrapComment | null>
  abstract findManyByScrapId(scrapId: string): Promise<ScrapComment[]>
  abstract delete(id: string): Promise<void>
}
