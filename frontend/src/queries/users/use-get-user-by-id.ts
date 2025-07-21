import { getUserByUsername } from '@/api/users/get-user-by-username'
import { useQuery } from '@tanstack/react-query'

export function useGetUserByUsername(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByUsername(username),
    enabled: !!username,
  })
}
