import { sentConnection } from '@/api/connections/sent-connection'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useSentConnection() {
  return useMutation({
    mutationFn: sentConnection,
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
