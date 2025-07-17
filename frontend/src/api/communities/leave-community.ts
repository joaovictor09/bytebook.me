import { api } from '@/lib/api'

export function leaveCommunity(id: string) {
  return api.delete(`/communities/${id}/leave`)
}
