import { GetCommunityDetailsUseCase } from '@/use-cases/communities/get-community-details'
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common'

@Controller('/communities/:communityId')
export class GetCommunityDetailsController {
  constructor(private getCommunityDetails: GetCommunityDetailsUseCase) {}

  @Get()
  async handle(@Param('communityId') communityId: string) {
    try {
      const { community } = await this.getCommunityDetails.execute({
        communityId,
      })

      return {
        community,
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          throw new ForbiddenException('Not allowed to create topic')
        }
        if (
          error.name === 'ResourceNotFoundError' ||
          error.message.includes('not found')
        ) {
          throw new NotFoundException('Community not found')
        }
      }
      throw error
    }
  }
}
