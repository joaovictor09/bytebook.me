import { api } from '@/lib/api'

export function joinCommunity(id: string) {
  return api.post(`/communities/${id}/join`)
}
