import { api } from '@/lib/axios'
import type { ConnectionStatus } from '@/types/connection'

interface GetUserConnectionStatusParams {
  userId: string
}

interface GetUserConnectionResponse {
  status: ConnectionStatus | 'NONE'
  connectionId: string | null
}

export async function getUserConnectionStatus({
  userId,
}: GetUserConnectionStatusParams): Promise<GetUserConnectionResponse> {
  const response = await api.get<GetUserConnectionResponse>(
    `/connections/${userId}/status`,
  )
  return response.data
}
