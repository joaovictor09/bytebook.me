import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'
import { GetCommunityDetailsUseCase } from './get-community-details'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

describe('Get Community Details Use Case', () => {
  let communitiesRepository: InMemoryCommunitiesRepository
  let getCommunityDetailsUseCase: GetCommunityDetailsUseCase

  beforeEach(() => {
    communitiesRepository = new InMemoryCommunitiesRepository()
    getCommunityDetailsUseCase = new GetCommunityDetailsUseCase(
      communitiesRepository,
    )
  })

  it('should return community details if community exists', async () => {
    const community = await communitiesRepository.create({
      id: 'community-1',
      name: 'Test Community',
      description: 'A description',
      ownerId: 'owner-1',
      memberCount: 0,
      createdAt: new Date(),
    })

    const { community: fetchedCommunity } =
      await getCommunityDetailsUseCase.execute({
        communityId: community.id,
      })

    expect(fetchedCommunity).toEqual(community)
  })

  it('should throw ResourceNotFoundError if community does not exist', async () => {
    await expect(
      getCommunityDetailsUseCase.execute({
        communityId: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
