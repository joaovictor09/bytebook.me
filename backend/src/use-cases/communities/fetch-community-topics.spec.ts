import { FetchCommunityTopicsUseCase } from './fetch-community-topics'
import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'

describe('Fetch Community Topics Use Case', () => {
  let topicsRepository: InMemoryTopicsRepository
  let fetchCommunityTopics: FetchCommunityTopicsUseCase

  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    fetchCommunityTopics = new FetchCommunityTopicsUseCase(topicsRepository)
  })

  it('should fetch all topics from community "eu odeio JavaScript puro"', async () => {
    const communityId = 'community-eu-odeio-js-puro'

    await topicsRepository.create({
      id: 'topic-1',
      communityId,
      authorId: 'user-1',
      title: 'Por que o var ainda existe?',
      content: 'Sério, alguém usa isso em 2025?',
      createdAt: new Date(),
    })

    await topicsRepository.create({
      id: 'topic-2',
      communityId,
      authorId: 'user-2',
      title: 'Callback hell é real',
      content: 'Só queria usar async/await em paz...',
      createdAt: new Date(),
    })

    const { topics } = await fetchCommunityTopics.execute({
      communityId,
    })

    expect(topics).toHaveLength(2)
    expect(topics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Por que o var ainda existe?' }),
        expect.objectContaining({ title: 'Callback hell é real' }),
      ]),
    )
  })
})
