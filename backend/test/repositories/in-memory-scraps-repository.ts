import { randomUUID } from 'node:crypto'
import type { Scrap, Prisma } from '@prisma/client'
import type { ScrapsRepository } from '@/repositories/scraps-repository'
import { ScrapWithSenderDTO } from '@/dtos/scraps.dto'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryScrapsRepository implements ScrapsRepository {
  constructor(private readonly userRepository: InMemoryUsersRepository) {}

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

  async findManyWithSenderByRecipientId(
    recipientId: string,
  ): Promise<ScrapWithSenderDTO[]> {
    const scraps: ScrapWithSenderDTO[] = this.items
      .filter((scrap) => scrap.recipientId === recipientId)
      .map((scrap) => {
        const sender = this.userRepository.items.find(
          (user) => user.id === scrap.senderId,
        )

        if (!sender) {
          throw new Error('Sender does not exists.')
        }

        return {
          id: scrap.id,
          message: scrap.message,
          recipientId: scrap.recipientId,
          senderId: scrap.senderId,
          sender: {
            id: sender.id,
            name: sender.name,
          },
        } as ScrapWithSenderDTO
      })

    return scraps
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((scrap) => scrap.id === id)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
