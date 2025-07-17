import { CreateTopicUseCase } from './create-topic'
import { InMemoryTopicsRepository } from 'test/repositories/in-memory-topics-repository'
import { InMemoryCommunityMembersRepository } from 'test/repositories/in-memory-community-members-repository'
import { InMemoryCommunitiesRepository } from 'test/repositories/in-memory-communities-repository'

describe('Create Topic Use Case', () => {
  let topicsRepository: InMemoryTopicsRepository
  let communityMembersRepository: InMemoryCommunityMembersRepository
  let communitiesRepository: InMemoryCommunitiesRepository
  let createTopic: CreateTopicUseCase

  beforeEach(() => {
    topicsRepository = new InMemoryTopicsRepository()
    communityMembersRepository = new InMemoryCommunityMembersRepository()
    communitiesRepository = new InMemoryCommunitiesRepository()
    createTopic = new CreateTopicUseCase(
      communityMembersRepository,
      topicsRepository,
      communitiesRepository,
    )
  })

  it('should allow member of community "eu odeio CSS" to create a topic', async () => {
    const userId = 'user-eu-amo-css-mas-nao-sei-usar'
    const communityId = 'community-eu-odeio-css'

    communitiesRepository.items.push({
      id: communityId,
      name: 'teste',
      createdAt: new Date(),
      description: 'teste',
      memberCount: 1,
      ownerId: userId,
    })

    await communityMembersRepository.create({
      communityId,
      userId,
    })

    const { topic } = await createTopic.execute({
      userId,
      communityId,
      title: 'Ajuda com borda arredondada 😭',
      content: 'Alguém sabe como centraliza no CSS sem usar margem aleatória?',
    })

    expect(topic).toMatchObject({
      authorId: userId,
      communityId,
      title: 'Ajuda com borda arredondada 😭',
      content: 'Alguém sabe como centraliza no CSS sem usar margem aleatória?',
    })
  })

  it('should not allow user to create topic if not member of "eu odeio JavaScript puro"', async () => {
    const userId = 'user-que-so-usa-framework'
    const communityId = 'community-eu-odeio-javascript-puro'

    await expect(() =>
      createTopic.execute({
        userId,
        communityId,
        title: 'Preciso fazer um fetch 😰',
        content: 'Alguém sabe usar XMLHttpRequest sem chorar?',
      }),
    ).rejects.toThrow()
  })
})
