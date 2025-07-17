import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { GetTopicDetailsUseCase } from './get-topic-details'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

describe('Get Topic Details Use Case', () => {
  let topicsRepository: InMemoryTopicsRepository
  let getTopicDetails: GetTopicDetailsUseCase

  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    getTopicDetails = new GetTopicDetailsUseCase(topicsRepository)
  })

  it('should return topic details if topic exists', async () => {
    const topic = await topicsRepository.create({
      title: 'Título do tópico',
      content: 'Conteúdo do tópico',
      communityId: 'community-1',
      authorId: 'user-1',
    })

    const result = await getTopicDetails.execute({ topicId: topic.id })

    expect(result.topic).toBeDefined()
    expect(result.topic.id).toBe(topic.id)
    expect(result.topic.title).toBe('Título do tópico')
    expect(result.topic.content).toBe('Conteúdo do tópico')
    expect(result.topic.communityId).toBe('community-1')
    expect(result.topic.authorId).toBe('user-1')
  })

  it('should throw ResourceNotFoundError if topic does not exist', async () => {
    await expect(
      getTopicDetails.execute({ topicId: 'non-existent-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
