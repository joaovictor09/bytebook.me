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
    const userA = await usersRepository.create({
      name: 'Alice',
      username: 'alice',
      passwordHash: 'hash123',
    })

    const userB = await usersRepository.create({
      name: 'Bob',
      username: 'bob',
      passwordHash: 'hash456',
    })

    const userC = await usersRepository.create({
      name: 'Alex',
      username: 'alex',
      passwordHash: 'hash789',
    })

    await scrapsRepository.create({
      senderId: userA.id,
      recipientId: userB.id,
      message: 'Fala aí!',
    })

    await scrapsRepository.create({
      senderId: userC.id,
      recipientId: userB.id,
      message: 'E aí beleza?',
    })

    await scrapsRepository.create({
      senderId: userB.id,
      recipientId: userA.id,
      message: 'Salve!',
    })

    const { scraps } = await sut.execute({
      userId: userB.id,
    })

    expect(scraps).toHaveLength(2)
    expect(scraps.every((scrap) => scrap.recipientId === userB.id)).toBe(true)
  })

  it('should return empty array if user has no scraps', async () => {
    const { scraps } = await sut.execute({
      userId: 'user-x',
    })

    expect(scraps).toHaveLength(0)
  })
})
