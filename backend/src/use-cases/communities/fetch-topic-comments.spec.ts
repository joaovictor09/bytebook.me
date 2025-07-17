import { InMemoryTopicCommentsRepository } from 'test/repositories/in-memory-topic-comments'
import { FetchTopicCommentsUseCase } from './fetch-topic-comments'

describe('Fetch Topic Comments Use Case', () => {
  let topicCommentsRepository: InMemoryTopicCommentsRepository
  let fetchTopicComments: FetchTopicCommentsUseCase

  beforeEach(() => {
    topicCommentsRepository = new InMemoryTopicCommentsRepository()
    fetchTopicComments = new FetchTopicCommentsUseCase(
      topicCommentsRepository as any,
    )
  })

  it('should fetch all comments for a topic', async () => {
    const topicId = 'topic-1'

    topicCommentsRepository.items.push(
      {
        id: 'comment-1',
        topicId,
        authorId: 'user-1',
        message: 'Primeiro comentário',
        createdAt: new Date(),
      },
      {
        id: 'comment-2',
        topicId,
        authorId: 'user-2',
        message: 'Segundo comentário',
        createdAt: new Date(),
      },
      {
        id: 'comment-3',
        topicId: 'topic-2',
        authorId: 'user-3',
        message: 'Comentário de outro tópico',
        createdAt: new Date(),
      },
    )

    const { topicComments } = await fetchTopicComments.execute({ topicId })

    expect(topicComments).toHaveLength(2)
    expect(topicComments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'Primeiro comentário' }),
        expect.objectContaining({ message: 'Segundo comentário' }),
      ]),
    )
  })

  it('should return an empty array if there are no comments for the topic', async () => {
    const { topicComments } = await fetchTopicComments.execute({
      topicId: 'non-existent-topic',
    })
    expect(topicComments).toEqual([])
  })
})
