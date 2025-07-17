import { api } from '@/lib/api'
import type { ConnectionWithFriend } from '@/types/connections'

interface GetUserConnectionsResponse {
  connections: ConnectionWithFriend[]
}

export function getUserConnections(id: string) {
  return api.get<GetUserConnectionsResponse>(`/users/${id}/connections`)
}
