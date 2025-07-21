import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { FindUserByUsernameUseCase } from './find-user-by-username'

describe('Find User By Username Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let findUserByUsernameUseCase: FindUserByUsernameUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    findUserByUsernameUseCase = new FindUserByUsernameUseCase(usersRepository)
  })

  it('should return the user when given a valid ID', async () => {
    const createdUser = await usersRepository.create({
      name: 'João Dev',
      username: 'joao',
      passwordHash: 'hashed-password',
    })

    const result = await findUserByUsernameUseCase.execute({
      username: createdUser.username,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.user).toEqual(
        expect.objectContaining({
          name: 'João Dev',
          username: 'joao',
        }),
      )
    }
  })

  it('should throw ResourceNotFoundError if user does not exist', async () => {
    const result = await findUserByUsernameUseCase.execute({
      username: 'non-existent-username',
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
