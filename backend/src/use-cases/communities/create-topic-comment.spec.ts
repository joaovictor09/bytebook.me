import { InMemoryCommunityMembersRepository } from 'test/repositories/in-memory-community-members-repository'
import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InMemoryTopicCommentsRepository } from 'test/repositories/in-memory-topic-comments'
import { CreateTopicCommentUseCase } from './create-topic-comment'

describe('Create Topic Comment Use Case', () => {
  let communityMembersRepository: InMemoryCommunityMembersRepository
  let topicsRepository: InMemoryTopicsRepository
  let topicCommentsRepository: InMemoryTopicCommentsRepository
  let createTopicCommentUseCase: CreateTopicCommentUseCase

  beforeEach(() => {
    communityMembersRepository = new InMemoryCommunityMembersRepository()
    topicsRepository = new InMemoryTopicsRepository()
    topicCommentsRepository = new InMemoryTopicCommentsRepository()
    createTopicCommentUseCase = new CreateTopicCommentUseCase(
      communityMembersRepository,
      topicsRepository,
      topicCommentsRepository,
    )
  })

  it('should create a topic comment when user is a member of the community', async () => {
    const userId = 'usuario-1'
    const communityId = 'comunidade-1'
    const topicId = 'topico-1'
    const message = 'Essa discussão tá hilária!'

    topicsRepository.items.push({
      id: topicId,
      title: 'Eu odeio JavaScript puro',
      content: 'Por que só uso TypeScript...',
      communityId,
      authorId: 'autor-1',
      createdAt: new Date(),
    })

    communityMembersRepository.items.push({
      id: 'membro-1',
      communityId,
      userId,
      joinedAt: new Date(),
    })

    const { topicComment } = await createTopicCommentUseCase.execute({
      userId,
      topicId,
      message,
    })

    expect(topicComment).toMatchObject({
      authorId: userId,
      topicId,
      message,
    })

    expect(topicCommentsRepository.items).toHaveLength(1)
    expect(topicCommentsRepository.items[0]).toEqual(topicComment)
  })

  it('should throw ResourceNotFoundError if topic does not exist', async () => {
    await expect(
      createTopicCommentUseCase.execute({
        userId: 'usuario-1',
        topicId: 'topico-inexistente',
        message: 'Comentando no vazio...',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw NotAllowedError if user is not a member of the community', async () => {
    const userId = 'usuario-1'
    const communityId = 'comunidade-1'
    const topicId = 'topico-1'
    const message = 'Tentando entrar na festa sem convite...'

    topicsRepository.items.push({
      id: topicId,
      title: 'JavaScript é demais, mude sua opinião!',
      content: 'Por que amo JS mesmo com seus defeitos',
      communityId,
      authorId: 'autor-1',
      createdAt: new Date(),
    })

    await expect(
      createTopicCommentUseCase.execute({
        userId,
        topicId,
        message,
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
