import type { CommunityMembersRepository } from '@/repositories/community-members-repository'
import type { CommunityMember, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryCommunityMembersRepository
  implements CommunityMembersRepository
{
  public items: CommunityMember[] = []

  async create(
    data: Prisma.CommunityMemberUncheckedCreateInput,
  ): Promise<CommunityMember> {
    const member: CommunityMember = {
      id: data.id ?? randomUUID(),
      communityId: data.communityId,
      userId: data.userId,
      joinedAt: data.joinedAt ? new Date(data.joinedAt) : new Date(),
    }

    this.items.push(member)
    return member
  }

  async findByUserAndCommunity(
    userId: string,
    communityId: string,
  ): Promise<CommunityMember | null> {
    return (
      this.items.find(
        (item) => item.userId === userId && item.communityId === communityId,
      ) ?? null
    )
  }

  async findManyByUserId(userId: string): Promise<CommunityMember[]> {
    return this.items.filter((item) => item.userId === userId)
  }

  async findManyByCommunityId(communityId: string): Promise<CommunityMember[]> {
    return this.items.filter((item) => item.communityId === communityId)
  }

  async deleteByUserAndCommunity(
    userId: string,
    communityId: string,
  ): Promise<void> {
    this.items = this.items.filter(
      (item) => !(item.userId === userId && item.communityId === communityId),
    )
  }
}
