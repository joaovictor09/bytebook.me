import type { CommunityMember, Prisma } from '@prisma/client'

export abstract class CommunityMembersRepository {
  abstract create(
    data: Prisma.CommunityMemberUncheckedCreateInput,
  ): Promise<CommunityMember>

  abstract findByUserAndCommunity(
    userId: string,
    communityId: string,
  ): Promise<CommunityMember | null>

  abstract findManyByUserId(userId: string): Promise<CommunityMember[]>
  abstract findManyByCommunityId(
    communityId: string,
  ): Promise<CommunityMember[]>

  abstract deleteByUserAndCommunity(
    userId: string,
    communityId: string,
  ): Promise<void>
}
