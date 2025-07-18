import { SearchCommunitiesUseCase } from './search-communities'
import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'

describe('Search Communities Use Case', () => {
  let communitiesRepository: InMemoryCommunitiesRepository
  let searchCommunitiesUseCase: SearchCommunitiesUseCase

  beforeEach(() => {
    communitiesRepository = new InMemoryCommunitiesRepository()
    searchCommunitiesUseCase = new SearchCommunitiesUseCase(
      communitiesRepository,
    )
  })

  it('should return communities matching the search query', async () => {
    await communitiesRepository.create({
      id: '1',
      name: 'Eu odeio JavaScript puro',
      description: 'Prefiro usar qualquer framework',
      ownerId: 'user-1',
      memberCount: 50,
      createdAt: new Date(),
    })

    await communitiesRepository.create({
      id: '2',
      name: 'Eu amo TypeScript',
      description: 'Nunca mais any',
      ownerId: 'user-2',
      memberCount: 70,
      createdAt: new Date(),
    })

    const { communities } = await searchCommunitiesUseCase.execute({
      query: 'javascript',
    })

    expect(communities).toHaveLength(1)
    expect(communities[0].name).toBe('Eu odeio JavaScript puro')
  })

  it('should return all communities if no search params', async () => {
    await communitiesRepository.create({
      id: '1',
      name: 'Eu odeio JavaScript puro',
      description: 'Prefiro usar qualquer framework',
      ownerId: 'user-1',
      memberCount: 50,
      createdAt: new Date(),
    })

    await communitiesRepository.create({
      id: '2',
      name: 'Eu amo TypeScript',
      description: 'Nunca mais any',
      ownerId: 'user-2',
      memberCount: 70,
      createdAt: new Date(),
    })

    const { communities } = await searchCommunitiesUseCase.execute({
      query: undefined,
    })

    expect(communities).toHaveLength(2)
  })

  it('should return an empty array if no community matches the query', async () => {
    await communitiesRepository.create({
      id: '1',
      name: 'Eu odeio acordar cedo',
      description: 'Principalmente segunda-feira',
      ownerId: 'user-3',
      memberCount: 120,
      createdAt: new Date(),
    })

    const { communities } = await searchCommunitiesUseCase.execute({
      query: 'typescript',
    })

    expect(communities).toHaveLength(0)
  })
})
