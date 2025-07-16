import { randomUUID } from 'node:crypto'
import type { Scrap, Prisma } from '@prisma/client'
import type { ScrapsRepository } from '@/repositories/scraps-repository'

export class InMemoryScrapsRepository implements ScrapsRepository {
  public items: Scrap[] = []

  async create(data: Prisma.ScrapUncheckedCreateInput): Promise<Scrap> {
    const scrap: Scrap = {
      id: randomUUID(),
      senderId: data.senderId,
      recipientId: data.recipientId,
      message: data.message,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(scrap)

    return scrap
  }

  async findById(id: string): Promise<Scrap | null> {
    return this.items.find((scrap) => scrap.id === id) ?? null
  }

  async findManyByRecipientId(recipientId: string): Promise<Scrap[]> {
    return this.items.filter((scrap) => scrap.recipientId === recipientId)
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((scrap) => scrap.id === id)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
