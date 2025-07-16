import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'
import { InMemoryCommunityMembersRepository } from 'test/repositories/in-memory-community-members-repository'
import { LeaveCommunityUseCase } from './leave-community'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { ForbiddenError } from '../_errors/forbidden-error'

describe('Leave Community Use Case', () => {
  let communitiesRepository: InMemoryCommunitiesRepository
  let communityMembersRepository: InMemoryCommunityMembersRepository
  let leaveCommunityUseCase: LeaveCommunityUseCase

  beforeEach(() => {
    communitiesRepository = new InMemoryCommunitiesRepository()
    communityMembersRepository = new InMemoryCommunityMembersRepository()
    leaveCommunityUseCase = new LeaveCommunityUseCase(
      communitiesRepository,
      communityMembersRepository,
    )
  })

  it('should allow a member to leave the community', async () => {
    const userId = 'user-1'
    const communityId = 'community-1'

    await communitiesRepository.create({
      id: communityId,
      name: 'Test Community',
      description: 'desc',
      ownerId: 'owner-id',
      memberCount: 2,
      createdAt: new Date(),
    })

    await communityMembersRepository.create({
      id: 'member-1',
      communityId,
      userId,
      joinedAt: new Date(),
    })

    await leaveCommunityUseCase.execute({ userId, communityId })

    expect(
      communityMembersRepository.items.find(
        (m) => m.userId === userId && m.communityId === communityId,
      ),
    ).toBeUndefined()

    expect(
      communitiesRepository.items.find((c) => c.id === communityId)
        ?.memberCount,
    ).toBe(1)
  })

  it('should throw ResourceNotFoundError if member or community not found', async () => {
    await expect(
      leaveCommunityUseCase.execute({
        userId: 'user-x',
        communityId: 'community-x',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw ForbiddenError if user is owner', async () => {
    const userId = 'owner-id'
    const communityId = 'community-1'

    await communitiesRepository.create({
      id: communityId,
      name: 'Test Community',
      description: 'desc',
      ownerId: userId,
      memberCount: 1,
      createdAt: new Date(),
    })

    await communityMembersRepository.create({
      id: 'member-1',
      communityId,
      userId,
      joinedAt: new Date(),
    })

    await expect(
      leaveCommunityUseCase.execute({ userId, communityId }),
    ).rejects.toBeInstanceOf(ForbiddenError)
  })
})
