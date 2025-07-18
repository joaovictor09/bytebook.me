import { searchCommunities } from '@/api/communities/search-communities'
import { useQuery } from '@tanstack/react-query'

export function useSearchCommunities(query?: string) {
  return useQuery({
    queryKey: ['communities', 'search', query],
    queryFn: () => searchCommunities(query),
  })
}
