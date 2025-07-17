import { joinCommunity } from '@/api/communities/join-community'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useJoinCommunity() {
  return useMutation({
    mutationFn: joinCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      queryClient.invalidateQueries({
        queryKey: ['communities'],
      })
    },
  })
}
