import { TopicComment, Prisma } from '@prisma/client'

export abstract class TopicCommentsRepository {
  abstract create(
    data: Prisma.TopicCommentUncheckedCreateInput,
  ): Promise<TopicComment>

  abstract findManyByTopicId(topicId: string): Promise<TopicComment[]>
  abstract delete(id: string): Promise<void>
}
