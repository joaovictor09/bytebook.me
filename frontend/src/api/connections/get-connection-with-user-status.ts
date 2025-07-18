import { api } from '@/lib/api'

export type ConnectionWithUserStatus =
  | 'ACCEPTED'
  | 'PENDING'
  | 'DECLINED'
  | 'NONE'

interface GetConnectionWithUserStatusResponse {
  status: ConnectionWithUserStatus
  connectionId: string | null
}

export function getConnectionWithUserStatus(id: string) {
  return api.get<GetConnectionWithUserStatusResponse>(
    `/connections/${id}/status`,
  )
}
