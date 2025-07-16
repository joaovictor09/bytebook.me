import { FetchCommunityMembersUseCase } from './fetch-community-members'
import { InMemoryCommunityMembersRepository } from 'test/repositories/in-memory-community-members-repository'

describe('Fetch Community Members Use Case', () => {
  let communityMembersRepository: InMemoryCommunityMembersRepository
  let fetchCommunityMembersUseCase: FetchCommunityMembersUseCase

  beforeEach(() => {
    communityMembersRepository = new InMemoryCommunityMembersRepository()
    fetchCommunityMembersUseCase = new FetchCommunityMembersUseCase(
      communityMembersRepository,
    )
  })

  it('should fetch all members of a given community', async () => {
    const communityId = 'community-1'

    communityMembersRepository.items.push(
      { id: 'member-1', communityId, userId: 'user-1', joinedAt: new Date() },
      { id: 'member-2', communityId, userId: 'user-2', joinedAt: new Date() },
    )

    const { communityMembers } = await fetchCommunityMembersUseCase.execute({
      communityId,
    })

    expect(communityMembers).toHaveLength(2)
    expect(communityMembers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-1' }),
        expect.objectContaining({ userId: 'user-2' }),
      ]),
    )
  })

  it('should return empty array if community has no members', async () => {
    const communityId = 'empty-community'

    const { communityMembers } = await fetchCommunityMembersUseCase.execute({
      communityId,
    })

    expect(communityMembers).toEqual([])
  })
})
