import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FetchUserScrapsUseCase } from './fetch-user-scraps'
import { InMemoryScrapsRepository } from 'test/repositories/in-memory-scraps-repository'

let usersRepository: InMemoryUsersRepository
let scrapsRepository: InMemoryScrapsRepository
let sut: FetchUserScrapsUseCase

describe('Fetch User Scraps Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    scrapsRepository = new InMemoryScrapsRepository(usersRepository)
    sut = new FetchUserScrapsUseCase(scrapsRepository)
  })

  it('should fetch scraps received by a user', async () => {
    await scrapsRepository.create({
      senderId: 'user-a',
      recipientId: 'user-b',
      message: 'Fala aí!',
    })

    await scrapsRepository.create({
      senderId: 'user-c',
      recipientId: 'user-b',
      message: 'E aí beleza?',
    })

    await scrapsRepository.create({
      senderId: 'user-b',
      recipientId: 'user-a',
      message: 'Salve!',
    })

    const { scraps } = await sut.execute({
      userId: 'user-b',
    })

    expect(scraps).toHaveLength(2)
    expect(scraps.every((scrap) => scrap.recipientId === 'user-b')).toBe(true)
  })

  it('should return empty array if user has no scraps', async () => {
    const { scraps } = await sut.execute({
      userId: 'user-x',
    })

    expect(scraps).toHaveLength(0)
  })
})
