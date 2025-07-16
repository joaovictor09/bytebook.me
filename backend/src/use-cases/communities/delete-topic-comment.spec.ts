import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { InMemoryTopicCommentsRepository } from 'test/repositories/in-memory-topic-comments'
import { DeleteTopicCommentUseCase } from './delete-topic-comment'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { NotAllowedError } from '../_errors/not-allowed-error'

describe('Delete Topic Comment Use Case', () => {
  let topicsRepository: InMemoryTopicsRepository
  let topicCommentsRepository: InMemoryTopicCommentsRepository
  let deleteTopicCommentUseCase: DeleteTopicCommentUseCase

  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    topicCommentsRepository = new InMemoryTopicCommentsRepository()
    deleteTopicCommentUseCase = new DeleteTopicCommentUseCase(
      topicsRepository,
      topicCommentsRepository,
    )
  })

  it('should allow the comment author to delete the comment', async () => {
    const topic = {
      id: 'topic-1',
      title: 'Eu odeio JavaScript puro',
      content: 'Motivos não faltam...',
      authorId: 'user-1',
      communityId: 'comunidade-1',
      createdAt: new Date(),
    }

    const comment = {
      id: 'comment-1',
      message: 'Concordo plenamente!',
      authorId: 'user-2',
      topicId: topic.id,
      createdAt: new Date(),
    }

    topicsRepository.items.push(topic)
    topicCommentsRepository.items.push(comment)

    await deleteTopicCommentUseCase.execute({
      topicCommentId: comment.id,
      userId: 'user-2',
    })

    expect(topicCommentsRepository.items).toHaveLength(0)
  })

  it('should allow the topic author to delete the comment', async () => {
    const topic = {
      id: 'topic-1',
      title: 'CSS deveria ser opcional',
      content: 'Sério mesmo',
      authorId: 'user-1',
      communityId: 'comunidade-1',
      createdAt: new Date(),
    }

    const comment = {
      id: 'comment-1',
      message: 'Relato de sofrimento real...',
      authorId: 'user-2',
      topicId: topic.id,
      createdAt: new Date(),
    }

    topicsRepository.items.push(topic)
    topicCommentsRepository.items.push(comment)

    await deleteTopicCommentUseCase.execute({
      topicCommentId: comment.id,
      userId: 'user-1',
    })

    expect(topicCommentsRepository.items).toHaveLength(0)
  })

  it('should throw if comment does not exist', async () => {
    await expect(() =>
      deleteTopicCommentUseCase.execute({
        topicCommentId: 'inexistente',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw if user is not the comment or topic author', async () => {
    const topic = {
      id: 'topic-1',
      title: 'JS é top',
      content: 'Mentira, mas vamos nessa',
      authorId: 'user-1',
      communityId: 'comunidade-1',
      createdAt: new Date(),
    }

    const comment = {
      id: 'comment-1',
      message: 'Discordo com classe',
      authorId: 'user-2',
      topicId: topic.id,
      createdAt: new Date(),
    }

    topicsRepository.items.push(topic)
    topicCommentsRepository.items.push(comment)

    await expect(() =>
      deleteTopicCommentUseCase.execute({
        topicCommentId: comment.id,
        userId: 'user-3',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
