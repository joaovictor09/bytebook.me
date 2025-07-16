import { SearchCommunitiesUseCase } from '@/use-cases/communities/search-communities'
import { Controller, Get, Query } from '@nestjs/common'

@Controller('/communities/search')
export class SearchCommunitiesController {
  constructor(private searchCommunities: SearchCommunitiesUseCase) {}

  @Get()
  async handle(@Query('q') query?: string) {
    const { communities } = await this.searchCommunities.execute({
      query,
    })

    return {
      communities,
    }
  }
}
