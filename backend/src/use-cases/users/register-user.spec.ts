import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from '../_errors/user-already-exists-error'
import { RegisterUserUseCase } from './register-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let usersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(usersRepository, fakeHasher)
  })

  it('should be able to register', async () => {
    const result = await sut.execute({
      username: 'johndoe',
      name: 'John Doe',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.user.id).toEqual(expect.any(String))
    }
  })

  it('should hash user password upon registration', async () => {
    const userPassword = '123456'

    const result = await sut.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: userPassword,
    })

    expect(result.isRight()).toBeTruthy()

    const userInRepository = usersRepository.items.find(
      (user) => user.username === 'johndoe',
    )

    expect(userInRepository).toBeTruthy()

    if (userInRepository) {
      if (result.isRight()) {
        const isPasswordCorrectlyHashed = await fakeHasher.compare(
          userPassword,
          userInRepository.passwordHash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
      }
    }
  })

  it('should not be able to register with same username twice', async () => {
    const username = 'johndoe'

    const registerUser = async () =>
      await sut.execute({
        name: 'John Doe',
        username,
        password: '123456',
      })

    await registerUser()
    const result = await registerUser()

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
