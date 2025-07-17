import { getUserConnections } from '@/api/connections/get-user-connections'
import { useQuery } from '@tanstack/react-query'

export function useGetUserConnections(id: string) {
  return useQuery({
    queryKey: ['user', id, 'connections'],
    queryFn: () => getUserConnections(id),
    enabled: !!id,
  })
}
