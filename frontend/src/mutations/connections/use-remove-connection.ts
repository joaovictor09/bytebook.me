import { removeConnection } from '@/api/connections/remove-connection'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useRemoveConnection() {
  return useMutation({
    mutationFn: removeConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      queryClient.invalidateQueries({
        queryKey: ['connections', 'status'],
      })
    },
  })
}
