import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'
import { InMemoryCommunityMembersRepository } from 'test/repositories/in-memory-community-members-repository'
import { JoinCommunityUseCase } from './join-community'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

describe('Join Community Use Case', () => {
  let communitiesRepository: InMemoryCommunitiesRepository
  let communityMembersRepository: InMemoryCommunityMembersRepository
  let joinCommunityUseCase: JoinCommunityUseCase

  beforeEach(() => {
    communitiesRepository = new InMemoryCommunitiesRepository()
    communityMembersRepository = new InMemoryCommunityMembersRepository()
    joinCommunityUseCase = new JoinCommunityUseCase(
      communitiesRepository,
      communityMembersRepository,
    )
  })

  it('should add user as community member and increment memberCount', async () => {
    const community = await communitiesRepository.create({
      id: 'community-1',
      name: 'Community Test',
      description: 'Description test',
      ownerId: 'owner-1',
      memberCount: 0,
      createdAt: new Date(),
    })

    const { communityMember } = await joinCommunityUseCase.execute({
      userId: 'user-123',
      communityId: community.id,
    })

    expect(communityMembersRepository.items).toHaveLength(1)
    expect(communityMembersRepository.items[0]).toMatchObject({
      userId: 'user-123',
      communityId: community.id,
    })

    expect(communityMember).toMatchObject({
      userId: 'user-123',
      communityId: community.id,
    })

    const updatedCommunity = await communitiesRepository.findById(community.id)
    expect(updatedCommunity?.memberCount).toBe(1)
  })

  it('should throw ResourceNotFoundError if community does not exist', async () => {
    await expect(
      joinCommunityUseCase.execute({
        userId: 'user-123',
        communityId: 'non-existent-community',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
