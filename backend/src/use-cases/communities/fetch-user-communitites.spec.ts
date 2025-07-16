import { FetchUserCommunitiesUseCase } from './fetch-user-communities'
import { InMemoryCommunityMembersRepository } from 'test/repositories/in-memory-community-members-repository'

describe('Fetch User Communities Use Case', () => {
  let communityMembersRepository: InMemoryCommunityMembersRepository
  let fetchUserCommunitiesUseCase: FetchUserCommunitiesUseCase

  beforeEach(() => {
    communityMembersRepository = new InMemoryCommunityMembersRepository()
    fetchUserCommunitiesUseCase = new FetchUserCommunitiesUseCase(
      communityMembersRepository,
    )
  })

  it('should fetch all communities that a user is member of', async () => {
    const userId = 'user-123'

    communityMembersRepository.items.push(
      {
        id: 'membership-1',
        communityId: 'community-1',
        userId,
        joinedAt: new Date(),
      },
      {
        id: 'membership-2',
        communityId: 'community-2',
        userId,
        joinedAt: new Date(),
      },
    )

    const { communityMembers } = await fetchUserCommunitiesUseCase.execute({
      userId,
    })

    expect(communityMembers).toHaveLength(2)
    expect(communityMembers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ communityId: 'community-1', userId }),
        expect.objectContaining({ communityId: 'community-2', userId }),
      ]),
    )
  })

  it('should return empty array if user is not member of any community', async () => {
    const { communityMembers } = await fetchUserCommunitiesUseCase.execute({
      userId: 'nonexistent-user',
    })

    expect(communityMembers).toEqual([])
  })
})
