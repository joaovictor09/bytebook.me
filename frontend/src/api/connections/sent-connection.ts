import { api } from '@/lib/api'

export function sentConnection(userId: string) {
  return api.post(`/connections/request/send/${userId}`)
}
