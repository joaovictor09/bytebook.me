import { api } from '@/lib/api'
import type { Community } from '@/types/community'

interface GetCommunityDetailsResponse {
  community: Community
}

export function getCommunityDetails(id: string) {
  return api.get<GetCommunityDetailsResponse>(`/communities/${id}`)
}
