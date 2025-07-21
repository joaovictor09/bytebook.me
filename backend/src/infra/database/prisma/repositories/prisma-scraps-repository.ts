import { ScrapsRepository } from '@/repositories/scraps-repository'
import { Injectable } from '@nestjs/common'
import { Prisma, Scrap } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { ScrapWithSenderDTO } from '@/dtos/scraps.dto'

@Injectable()
export class PrismaScrapsRepository implements ScrapsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ScrapUncheckedCreateInput): Promise<Scrap> {
    const scrap = await this.prisma.scrap.create({
      data,
    })

    return scrap
  }

  async findById(id: string): Promise<Scrap | null> {
    const scrap = await this.prisma.scrap.findUnique({
      where: {
        id,
      },
    })

    if (!scrap) {
      return null
    }

    return scrap
  }

  async findManyByRecipientId(recipientId: string): Promise<Scrap[]> {
    const scraps = await this.prisma.scrap.findMany({
      where: {
        recipientId,
      },
    })

    return scraps
  }

  async findManyWithSenderByRecipientId(
    recipientId: string,
  ): Promise<ScrapWithSenderDTO[]> {
    const scraps = await this.prisma.scrap.findMany({
      where: {
        recipientId,
      },
      include: {
        sender: true,
      },
    })

    return scraps.map((scrap) => {
      return {
        id: scrap.id,
        message: scrap.message,
        recipientId: scrap.recipientId,
        senderId: scrap.senderId,
        sender: {
          id: scrap.sender.id,
          name: scrap.sender.name,
        },
      }
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.scrap.delete({
      where: { id },
    })
  }
}
