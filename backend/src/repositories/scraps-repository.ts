import { ScrapWithSenderDTO } from '@/dtos/scraps.dto'
import type { Prisma, Scrap } from '@prisma/client'

export abstract class ScrapsRepository {
  abstract create(data: Prisma.ScrapUncheckedCreateInput): Promise<Scrap>
  abstract findById(id: string): Promise<Scrap | null>
  abstract findManyByRecipientId(recipientId: string): Promise<Scrap[]>
  abstract findManyWithSenderByRecipientId(
    recipientId: string,
  ): Promise<ScrapWithSenderDTO[]>

  abstract delete(id: string): Promise<void>
}
