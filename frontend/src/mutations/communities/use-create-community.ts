import { createCommunity } from '@/api/communities/create-community'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useCreateCommunity() {
  return useMutation({
    mutationFn: createCommunity,
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
