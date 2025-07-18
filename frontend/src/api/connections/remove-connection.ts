import { api } from '@/lib/api'

export function removeConnection(connectionId: string) {
  return api.delete(`/connections/${connectionId}`)
}
