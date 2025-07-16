import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'
import { DeleteTopicUseCase } from './delete-topic'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { NotAllowedError } from '../_errors/not-allowed-error'

describe('Delete Topic Use Case', () => {
  let topicsRepository: InMemoryTopicsRepository
  let communitiesRepository: InMemoryCommunitiesRepository
  let deleteTopicUseCase: DeleteTopicUseCase

  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    communitiesRepository = new InMemoryCommunitiesRepository()
    deleteTopicUseCase = new DeleteTopicUseCase(
      topicsRepository,
      communitiesRepository,
    )
  })

  it('should allow the topic author to delete the topic', async () => {
    const community = {
      id: 'comunidade-1',
      name: 'Eu odeio CSS',
      description: 'Se posicionar elementos fosse fácil, não precisava de div',
      ownerId: 'user-999',
      createdAt: new Date(),
      memberCount: 1,
    }

    const topic = {
      id: 'topic-1',
      title: 'CSS: Centralizar é impossível',
      content: 'justify-content o quê?',
      communityId: community.id,
      authorId: 'user-1',
      createdAt: new Date(),
    }

    communitiesRepository.items.push(community)
    topicsRepository.items.push(topic)

    await deleteTopicUseCase.execute({
      userId: 'user-1',
      topicId: topic.id,
    })

    expect(topicsRepository.items).toHaveLength(0)
  })

  it('should allow the community owner to delete the topic', async () => {
    const community = {
      id: 'comunidade-1',
      name: 'Programadores cansados',
      description: 'Ctrl+C, Ctrl+V, fé',
      ownerId: 'user-2',
      createdAt: new Date(),
      memberCount: 1,
    }

    const topic = {
      id: 'topic-2',
      title: 'Copiei do StackOverflow e funcionou',
      content: 'Nem sei como...',
      communityId: community.id,
      authorId: 'user-1',
      createdAt: new Date(),
    }

    communitiesRepository.items.push(community)
    topicsRepository.items.push(topic)

    await deleteTopicUseCase.execute({
      userId: 'user-2',
      topicId: topic.id,
    })

    expect(topicsRepository.items).toHaveLength(0)
  })

  it('should throw ResourceNotFoundError if topic does not exist', async () => {
    await expect(() =>
      deleteTopicUseCase.execute({
        userId: 'user-1',
        topicId: 'inexistente',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw Error if community does not exist', async () => {
    const topic = {
      id: 'topic-3',
      title: 'Frontend é sofrido',
      content: 'React ou Angular?',
      communityId: 'comunidade-inexistente',
      authorId: 'user-1',
      createdAt: new Date(),
    }

    topicsRepository.items.push(topic)

    await expect(() =>
      deleteTopicUseCase.execute({
        userId: 'user-1',
        topicId: topic.id,
      }),
    ).rejects.toThrowError()
  })

  it('should throw NotAllowedError if user is neither topic author nor community owner', async () => {
    const community = {
      id: 'comunidade-1',
      name: 'HTML não é linguagem de programação',
      description: 'Mas eu amo ele mesmo assim',
      ownerId: 'user-3',
      createdAt: new Date(),
      memberCount: 1,
    }

    const topic = {
      id: 'topic-4',
      title: 'HTML: estrutura da web',
      content: 'Sem ele nada existe',
      communityId: community.id,
      authorId: 'user-1',
      createdAt: new Date(),
    }

    communitiesRepository.items.push(community)
    topicsRepository.items.push(topic)

    await expect(() =>
      deleteTopicUseCase.execute({
        userId: 'user-2',
        topicId: topic.id,
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
