import { Topic, Prisma } from '@prisma/client'

export abstract class TopicsRepository {
  abstract create(data: Prisma.TopicUncheckedCreateInput): Promise<Topic>
  abstract save(topic: Topic): Promise<Topic>
  abstract findById(id: string): Promise<Topic | null>
  abstract findManyByCommunityId(communityId: string): Promise<Topic[]>
  abstract delete(id: string): Promise<void>
}
