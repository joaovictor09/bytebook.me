import type { CommunitiesRepository } from '@/repositories/communities-repository'
import type { Community, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryCommunitiesRepository implements CommunitiesRepository {
  public items: Community[] = []

  async create(data: Prisma.CommunityUncheckedCreateInput): Promise<Community> {
    const community: Community = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      ownerId: data.ownerId,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      memberCount: data.memberCount ?? 1,
    }

    this.items.push(community)
    return community
  }

  async findAll(): Promise<Community[]> {
    return this.items
  }

  async findById(id: string): Promise<Community | null> {
    const community = this.items.find((item) => item.id === id) ?? null
    return community
  }

  async findManyByName(name: string): Promise<Community[]> {
    return this.items.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  async findManyByUserId(userId: string): Promise<Community[]> {
    return this.items.filter((item) => item.ownerId === userId)
  }

  async incrementMemberCount(id: string): Promise<void> {
    const community = await this.findById(id)
    if (community) {
      community.memberCount = (community.memberCount ?? 0) + 1
    }
  }

  async decrementMemberCount(id: string): Promise<void> {
    const community = await this.findById(id)
    if (community) {
      community.memberCount = Math.max((community.memberCount ?? 1) - 1, 0)
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
