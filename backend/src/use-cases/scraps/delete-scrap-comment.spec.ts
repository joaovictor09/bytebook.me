import { DeleteScrapCommentUseCase } from './delete-scrap-comment'
import { InMemoryScrapCommentsRepository } from 'test/repositories/in-memory-scrap-comments-repository'
import { InMemoryScrapsRepository } from 'test/repositories/in-memory-scraps-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

let scrapCommentsRepository: InMemoryScrapCommentsRepository
let scrapsRepository: InMemoryScrapsRepository
let sut: DeleteScrapCommentUseCase

describe('Delete Scrap Comment Use Case', () => {
  beforeEach(() => {
    scrapCommentsRepository = new InMemoryScrapCommentsRepository()
    scrapsRepository = new InMemoryScrapsRepository()
    sut = new DeleteScrapCommentUseCase(
      scrapCommentsRepository,
      scrapsRepository,
    )
  })

  it('should allow the comment author to delete it', async () => {
    const scrap = await scrapsRepository.create({
      senderId: 'sender-id',
      recipientId: 'recipient-id',
      message: 'Mensagem',
    })

    const comment = await scrapCommentsRepository.create({
      message: 'Comentário',
      scrapId: scrap.id,
      senderId: 'user-a',
    })

    await sut.execute({
      scrapCommentId: comment.id,
      userId: 'user-a',
    })

    const stillExists = await scrapCommentsRepository.findById(comment.id)
    expect(stillExists).toBeNull()
  })

  it('should allow the scrap recipient to delete the comment', async () => {
    const scrap = await scrapsRepository.create({
      senderId: 'sender-id',
      recipientId: 'recipient-id',
      message: 'Mensagem',
    })

    const comment = await scrapCommentsRepository.create({
      message: 'Comentário',
      scrapId: scrap.id,
      senderId: 'user-a',
    })

    await sut.execute({
      scrapCommentId: comment.id,
      userId: 'recipient-id',
    })

    const stillExists = await scrapCommentsRepository.findById(comment.id)
    expect(stillExists).toBeNull()
  })

  it('should not allow a user that is neither author nor recipient to delete', async () => {
    const scrap = await scrapsRepository.create({
      senderId: 'sender-id',
      recipientId: 'recipient-id',
      message: 'Mensagem',
    })

    const comment = await scrapCommentsRepository.create({
      message: 'Comentário',
      scrapId: scrap.id,
      senderId: 'user-a',
    })

    await expect(() =>
      sut.execute({
        scrapCommentId: comment.id,
        userId: 'intruder-id',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should throw if comment does not exist', async () => {
    await expect(() =>
      sut.execute({
        scrapCommentId: 'non-existent',
        userId: 'any-user',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
