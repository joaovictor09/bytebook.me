import { FetchUserCommunitiesUseCase } from './fetch-user-communities'
import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'

describe('Fetch User Communities Use Case', () => {
  let communitiesRepository: InMemoryCommunitiesRepository
  let fetchUserCommunitiesUseCase: FetchUserCommunitiesUseCase

  beforeEach(() => {
    communitiesRepository = new InMemoryCommunitiesRepository()
    fetchUserCommunitiesUseCase = new FetchUserCommunitiesUseCase(
      communitiesRepository,
    )
  })

  it('should fetch all communities that a user is member of', async () => {
    const userId = 'user-123'

    // Add communities
    communitiesRepository.items.push(
      {
        id: 'community-1',
        name: 'Community 1',
        description: 'Test community 1',
        createdAt: new Date(),
        memberCount: 1,
        ownerId: userId,
      },
      {
        id: 'community-2',
        name: 'Community 2',
        description: 'Test community 2',
        createdAt: new Date(),
        memberCount: 1,
        ownerId: userId,
      },
    )

    const { communities } = await fetchUserCommunitiesUseCase.execute({
      userId,
    })

    expect(communities).toHaveLength(2)
    expect(communities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'community-1' }),
        expect.objectContaining({ id: 'community-2' }),
      ]),
    )
  })

  it('should return empty array if user is not member of any community', async () => {
    const { communities } = await fetchUserCommunitiesUseCase.execute({
      userId: 'nonexistent-user',
    })

    expect(communities).toEqual([])
  })
})
