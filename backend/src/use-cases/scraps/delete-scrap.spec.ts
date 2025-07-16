import { DeleteScrapUseCase } from './delete-scrap'
import { InMemoryScrapsRepository } from 'test/repositories/in-memory-scraps-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

let scrapsRepository: InMemoryScrapsRepository
let sut: DeleteScrapUseCase

describe('Delete Scrap Use Case', () => {
  beforeEach(() => {
    scrapsRepository = new InMemoryScrapsRepository()
    sut = new DeleteScrapUseCase(scrapsRepository)
  })

  it('should allow sender to delete the scrap', async () => {
    const scrap = await scrapsRepository.create({
      senderId: 'user-a',
      recipientId: 'user-b',
      message: 'Olá!',
    })

    await sut.execute({
      scrapId: scrap.id,
      userId: 'user-a',
    })

    const deleted = await scrapsRepository.findById(scrap.id)
    expect(deleted).toBeNull()
  })

  it('should allow recipient to delete the scrap', async () => {
    const scrap = await scrapsRepository.create({
      senderId: 'user-a',
      recipientId: 'user-b',
      message: 'Oi!',
    })

    await sut.execute({
      scrapId: scrap.id,
      userId: 'user-b',
    })

    const deleted = await scrapsRepository.findById(scrap.id)
    expect(deleted).toBeNull()
  })

  it('should not allow other users to delete the scrap', async () => {
    const scrap = await scrapsRepository.create({
      senderId: 'user-a',
      recipientId: 'user-b',
      message: 'Salve!',
    })

    await expect(() =>
      sut.execute({
        scrapId: scrap.id,
        userId: 'user-c',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should throw if scrap does not exist', async () => {
    await expect(() =>
      sut.execute({
        scrapId: 'non-existent-id',
        userId: 'user-a',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
