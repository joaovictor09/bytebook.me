import { getCommunityMembers } from '@/api/communities/get-community-members'
import { useQuery } from '@tanstack/react-query'

export function useGetCommunityMembers(id: string) {
  return useQuery({
    queryKey: ['communities', id, 'members'],
    queryFn: () => getCommunityMembers(id),
    enabled: !!id,
  })
}
