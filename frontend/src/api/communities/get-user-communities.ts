import { api } from '@/lib/api'
import type { Community } from '@/types/community'

interface GetUserCommunitiesResponse {
  communities: Community[]
}

export function getUserCommunities(id: string) {
  return api.get<GetUserCommunitiesResponse>(`/users/${id}/communities`)
}
