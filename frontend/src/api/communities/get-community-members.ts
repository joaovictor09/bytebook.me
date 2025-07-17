import { api } from '@/lib/api'
import type { CommunityMember } from '@/types/community'

interface GetCommunityMembersResponse {
  communityMembers: CommunityMember[]
}

export function getCommunityMembers(id: string) {
  return api.get<GetCommunityMembersResponse>(`/communities/${id}/members`)
}
