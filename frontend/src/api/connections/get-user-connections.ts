import { api } from '@/lib/api'
import type { ConnectionWithUser } from '@/types/connections'

interface GetUserConnectionsResponse {
  connections: ConnectionWithUser[]
}

export function getUserConnections(id: string) {
  return api.get<GetUserConnectionsResponse>(`/users/${id}/connections`)
}
