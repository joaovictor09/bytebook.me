import { fetchScrapsByUserId } from '@/api/scraps/fetch-scraps-by-user-id'
import { useQuery } from '@tanstack/react-query'

export function useFetchScrapsByUserId(id: string) {
  return useQuery({
    queryKey: ['user', id, 'scraps'],
    queryFn: () => fetchScrapsByUserId(id),
    enabled: !!id,
  })
}
