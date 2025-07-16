import type { Prisma, Scrap } from '@prisma/client'

export abstract class ScrapsRepository {
  abstract create(data: Prisma.ScrapUncheckedCreateInput): Promise<Scrap>
  abstract findById(id: string): Promise<Scrap | null>
  abstract findManyByRecipientId(recipientId: string): Promise<Scrap[]>
  abstract delete(id: string): Promise<void>
}
