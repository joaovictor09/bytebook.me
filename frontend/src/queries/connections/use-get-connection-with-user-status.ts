import { getConnectionWithUserStatus } from '@/api/connections/get-connection-with-user-status'
import { useQuery } from '@tanstack/react-query'

export function useGetConnectionWithUserStatus(id: string) {
  return useQuery({
    queryKey: ['connections', 'status', id],
    queryFn: () => getConnectionWithUserStatus(id),
    enabled: !!id,
  })
}
