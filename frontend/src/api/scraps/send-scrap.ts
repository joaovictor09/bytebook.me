import { api } from '@/lib/api'

interface SendScrapRequest {
  recipientId: string
  message: string
}

export function sendScrap({ recipientId, ...body }: SendScrapRequest) {
  return api.post(`/scraps/send/${recipientId}`, body)
}
