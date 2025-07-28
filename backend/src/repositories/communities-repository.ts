import { Community, Prisma } from '@prisma/client'

export abstract class CommunitiesRepository {
  abstract create(
    data: Prisma.CommunityUncheckedCreateInput,
  ): Promise<Community>

  abstract findById(id: string): Promise<Community | null>
  abstract findAll(): Promise<Community[]>
  abstract findManyByName(name: string): Promise<Community[]>
  abstract findManyByUserId(userId: string): Promise<Community[]>
  abstract countByUserId(userId: string): Promise<number>
  abstract incrementMemberCount(id: string): Promise<void>
  abstract decrementMemberCount(id: string): Promise<void>
  abstract delete(id: string): Promise<void>
}
