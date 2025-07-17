import { getCommunityDetails } from '@/api/communities/get-community-details'
import { useQuery } from '@tanstack/react-query'

export function useGetCommunityDetails(id: string) {
  return useQuery({
    queryKey: ['communities', id],
    queryFn: () => getCommunityDetails(id),
    enabled: !!id,
  })
}
