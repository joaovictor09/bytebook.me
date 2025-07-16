import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { EditTopicUseCase } from './edit-topic'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

describe('Edit Topic Use Case', () => {
  let topicsRepository: InMemoryTopicsRepository
  let editTopicUseCase: EditTopicUseCase

  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    editTopicUseCase = new EditTopicUseCase(topicsRepository)
  })

  it('should allow the author to edit a topic', async () => {
    const topic = await topicsRepository.create({
      id: 'topic-1',
      communityId: 'community-1',
      authorId: 'user-123',
      title: 'Por que odeio CSS',
      content: 'Sério, margin nunca funciona!',
    })

    const result = await editTopicUseCase.execute({
      userId: 'user-123',
      topicId: topic.id,
      title: 'Atualizei meu ódio ao CSS',
      content: 'Padding agora também me irrita.',
    })

    expect(result.topic.title).toBe('Atualizei meu ódio ao CSS')
    expect(result.topic.content).toBe('Padding agora também me irrita.')
  })

  it('should not allow editing if topic does not exist', async () => {
    await expect(() =>
      editTopicUseCase.execute({
        userId: 'user-123',
        topicId: 'non-existent-id',
        title: 'Novo título',
        content: 'Novo conteúdo',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not allow editing if user is not the author', async () => {
    const topic = await topicsRepository.create({
      id: 'topic-2',
      communityId: 'community-1',
      authorId: 'user-999',
      title: 'Javascript puro é uma cilada',
      content: 'Nunca mais uso document.createElement',
    })

    await expect(() =>
      editTopicUseCase.execute({
        userId: 'user-123',
        topicId: topic.id,
        title: 'Quero mudar',
        content: 'Mas não sou o autor',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
