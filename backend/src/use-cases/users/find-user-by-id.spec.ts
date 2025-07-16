import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FindUserByIdUseCase } from './find-user-by-id'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

describe('Find User By ID Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let findUserByIdUseCase: FindUserByIdUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)
  })

  it('should return the user when given a valid ID', async () => {
    const createdUser = await usersRepository.create({
      name: 'João Dev',
      email: 'joao@example.com',
      passwordHash: 'hashed-password',
    })

    const { user } = await findUserByIdUseCase.execute({
      userId: createdUser.id,
    })

    expect(user).toEqual(createdUser)
  })

  it('should throw ResourceNotFoundError if user does not exist', async () => {
    await expect(
      findUserByIdUseCase.execute({
        userId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
