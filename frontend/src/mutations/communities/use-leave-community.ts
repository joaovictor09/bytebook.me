import { leaveCommunity } from '@/api/communities/leave-community'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useLeaveCommunity() {
  return useMutation({
    mutationFn: leaveCommunity,
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
