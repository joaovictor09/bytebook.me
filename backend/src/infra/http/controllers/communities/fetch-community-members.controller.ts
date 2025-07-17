import { FetchCommunityMembersUseCase } from '@/use-cases/communities/fetch-community-members'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('/communities/:communityId/members')
export class FetchCommunityMembersController {
  constructor(private fetchCommunityMembers: FetchCommunityMembersUseCase) {}

  @Get()
  async handle(@Param('communityId') communityId: string) {
    const { communityMembers } = await this.fetchCommunityMembers.execute({
      communityId,
    })

    return {
      communityMembers,
    }
  }
}
