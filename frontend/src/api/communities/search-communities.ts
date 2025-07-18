import { api } from '@/lib/api'
import type { Community } from '@/types/community'

interface SearchCommunitiesResponse {
  communities: Community[]
}

export function searchCommunities(query?: string) {
  return api.get<SearchCommunitiesResponse>(
    `/communities/search${query ? `q?${query}` : ''}`,
  )
}
