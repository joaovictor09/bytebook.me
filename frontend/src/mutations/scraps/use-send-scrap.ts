import { sendScrap } from '@/api/scraps/send-scrap'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useSendScrap() {
  return useMutation({
    mutationFn: sendScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}
