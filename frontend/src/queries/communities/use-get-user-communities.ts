import { getUserCommunities } from '@/api/communities/get-user-communities'
import { useQuery } from '@tanstack/react-query'

export function useGetUserCommunities(id: string) {
  return useQuery({
    queryKey: ['user', id, 'communities'],
    queryFn: () => getUserCommunities(id),
    enabled: !!id,
  })
}
