import { SendScrapUseCase } from './send-scrap'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryScrapsRepository } from 'test/repositories/in-memory-scraps-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { InvalidScrapOperationError } from '../_errors/invalid-scrap-operation-error'

let usersRepository: InMemoryUsersRepository
let scrapsRepository: InMemoryScrapsRepository
let sut: SendScrapUseCase

describe('Send Scrap Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    scrapsRepository = new InMemoryScrapsRepository(usersRepository)
    sut = new SendScrapUseCase(usersRepository, scrapsRepository)
  })

  it('should send a scrap successfully', async () => {
    const sender = await usersRepository.create({
      name: 'Alice',
      username: 'alice',
      passwordHash: 'hash123',
    })

    const recipient = await usersRepository.create({
      name: 'Bob',
      username: 'bob',
      passwordHash: 'hash456',
    })

    const { scrap } = await sut.execute({
      senderId: sender.id,
      recipientId: recipient.id,
      message: 'Hello Bob!',
    })

    expect(scrap).toHaveProperty('id')
    expect(scrap.message).toBe('Hello Bob!')
    expect(scrap.senderId).toBe(sender.id)
    expect(scrap.recipientId).toBe(recipient.id)
  })

  it('should throw if sender does not exist', async () => {
    const recipient = await usersRepository.create({
      name: 'Bob',
      username: 'bob',
      passwordHash: 'hash456',
    })

    await expect(() =>
      sut.execute({
        senderId: 'non-existent-id',
        recipientId: recipient.id,
        message: 'Hello!',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw if recipient does not exist', async () => {
    const sender = await usersRepository.create({
      name: 'Alice',
      username: 'alice',
      passwordHash: 'hash123',
    })

    await expect(() =>
      sut.execute({
        senderId: sender.id,
        recipientId: 'non-existent-id',
        message: 'Hello!',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw if sender and recipient are the same user', async () => {
    const user = await usersRepository.create({
      name: 'Alice',
      username: 'alice',
      passwordHash: 'hash123',
    })

    await expect(() =>
      sut.execute({
        senderId: user.id,
        recipientId: user.id,
        message: 'Hello myself!',
      }),
    ).rejects.toBeInstanceOf(InvalidScrapOperationError)
  })
})
