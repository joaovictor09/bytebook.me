import { CommentScrapUseCase } from './comment-scrap'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryScrapsRepository } from 'test/repositories/in-memory-scraps-repository'
import { InMemoryScrapCommentsRepository } from 'test/repositories/in-memory-scrap-comments-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let scrapsRepository: InMemoryScrapsRepository
let scrapCommentsRepository: InMemoryScrapCommentsRepository
let sut: CommentScrapUseCase

describe('Comment Scrap Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    scrapsRepository = new InMemoryScrapsRepository()
    scrapCommentsRepository = new InMemoryScrapCommentsRepository()
    sut = new CommentScrapUseCase(
      usersRepository,
      scrapsRepository,
      scrapCommentsRepository,
    )
  })

  it('should allow a user to comment on a scrap', async () => {
    const sender = await usersRepository.create({
      name: 'User 1',
      email: 'user1@example.com',
      passwordHash: '123456',
    })

    const recipient = await usersRepository.create({
      name: 'User 2',
      email: 'user2@example.com',
      passwordHash: '123456',
    })

    const scrap = await scrapsRepository.create({
      senderId: sender.id,
      recipientId: recipient.id,
      message: 'Oi, tudo bem?',
    })

    const { comment } = await sut.execute({
      senderId: recipient.id,
      scrapId: scrap.id,
      message: 'Tudo sim e você?',
    })

    expect(comment).toHaveProperty('id')
    expect(comment.message).toBe('Tudo sim e você?')
    expect(comment.scrapId).toBe(scrap.id)
    expect(comment.senderId).toBe(recipient.id)
  })

  it('should throw if sender does not exist', async () => {
    const recipient = await usersRepository.create({
      name: 'User 2',
      email: 'user2@example.com',
      passwordHash: '123456',
    })

    const scrap = await scrapsRepository.create({
      senderId: 'sender-id',
      recipientId: recipient.id,
      message: 'Oi!',
    })

    await expect(() =>
      sut.execute({
        senderId: 'non-existent',
        scrapId: scrap.id,
        message: 'Oi',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw if scrap does not exist', async () => {
    const sender = await usersRepository.create({
      name: 'User',
      email: 'user@example.com',
      passwordHash: '123456',
    })

    await expect(() =>
      sut.execute({
        senderId: sender.id,
        scrapId: 'non-existent',
        message: 'Comentário inválido',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
