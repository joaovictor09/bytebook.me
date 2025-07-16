import { TopicComment } from '@prisma/client'
import { TopicCommentsRepository } from '@/repositories/topic-comments-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryTopicCommentsRepository
  implements TopicCommentsRepository
{
  public items: TopicComment[] = []

  async create(data: any): Promise<TopicComment> {
    const comment: TopicComment = {
      id: randomUUID(),
      message: data.message,
      topicId: data.topicId,
      authorId: data.authorId,
      createdAt: new Date(),
    }

    this.items.push(comment)
    return comment
  }

  async findManyByTopicId(topicId: string): Promise<TopicComment[]> {
    return this.items.filter((item) => item.topicId === topicId)
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
