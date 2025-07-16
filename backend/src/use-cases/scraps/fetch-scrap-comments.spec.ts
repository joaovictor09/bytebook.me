import { FetchScrapCommentsUseCase } from './fetch-scrap-comments'
import { InMemoryScrapCommentsRepository } from 'test/repositories/in-memory-scrap-comments-repository'

let scrapCommentsRepository: InMemoryScrapCommentsRepository
let sut: FetchScrapCommentsUseCase

describe('Fetch Scrap Comments Use Case', () => {
  beforeEach(() => {
    scrapCommentsRepository = new InMemoryScrapCommentsRepository()
    sut = new FetchScrapCommentsUseCase(scrapCommentsRepository)
  })

  it('should return all comments for a scrap', async () => {
    await scrapCommentsRepository.create({
      scrapId: 'scrap-1',
      senderId: 'user-1',
      message: 'Comentário 1',
    })

    await scrapCommentsRepository.create({
      scrapId: 'scrap-1',
      senderId: 'user-2',
      message: 'Comentário 2',
    })

    await scrapCommentsRepository.create({
      scrapId: 'scrap-2',
      senderId: 'user-3',
      message: 'Comentário outro scrap',
    })

    const { comments } = await sut.execute({ scrapId: 'scrap-1' })

    expect(comments).toHaveLength(2)
    expect(comments.every((c) => c.scrapId === 'scrap-1')).toBe(true)
  })

  it('should return empty array if no comments found', async () => {
    const { comments } = await sut.execute({ scrapId: 'scrap-x' })

    expect(comments).toHaveLength(0)
  })
})
