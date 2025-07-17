import { getUserById } from '@/api/users/get-user-by-id'
import { useQuery } from '@tanstack/react-query'

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  })
}
