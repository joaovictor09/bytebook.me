import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'
import { InMemoryCommunityMembersRepository } from 'test/repositories/in-memory-community-members-repository'
import { CreateCommunityUseCase } from './create-community'

describe('Create Community Use Case', () => {
  let communitiesRepository: InMemoryCommunitiesRepository
  let communityMembersRepository: InMemoryCommunityMembersRepository
  let createCommunityUseCase: CreateCommunityUseCase

  beforeEach(() => {
    communitiesRepository = new InMemoryCommunitiesRepository()
    communityMembersRepository = new InMemoryCommunityMembersRepository()
    createCommunityUseCase = new CreateCommunityUseCase(
      communitiesRepository,
      communityMembersRepository,
    )
  })

  it('should create a community and add the creator as member', async () => {
    const userId = 'user-123'
    const name = 'My Community'
    const description = 'Community description'

    const { community } = await createCommunityUseCase.execute({
      userId,
      name,
      description,
    })

    expect(community).toMatchObject({
      name,
      description,
      ownerId: userId,
      memberCount: 1,
    })

    expect(communitiesRepository.items).toHaveLength(1)
    expect(communitiesRepository.items[0]).toEqual(community)

    expect(communityMembersRepository.items).toHaveLength(1)
    expect(communityMembersRepository.items[0]).toMatchObject({
      communityId: community.id,
      userId,
    })
  })
})
