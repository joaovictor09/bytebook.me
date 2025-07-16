import { Topic } from '@prisma/client'
import { TopicsRepository } from '@/repositories/topics-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryTopicsRepository implements TopicsRepository {
  public items: Topic[] = []

  async create(data: any): Promise<Topic> {
    const topic: Topic = {
      id: randomUUID(),
      title: data.title,
      content: data.content,
      communityId: data.communityId,
      authorId: data.authorId,
      createdAt: new Date(),
    }

    this.items.push(topic)
    return topic
  }

  async findById(id: string): Promise<Topic | null> {
    return this.items.find((item) => item.id === id) || null
  }

  async findManyByCommunityId(communityId: string): Promise<Topic[]> {
    return this.items.filter((item) => item.communityId === communityId)
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
