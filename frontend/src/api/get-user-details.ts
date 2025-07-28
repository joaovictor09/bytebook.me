import { api } from '@/lib/axios'
import type { UserDetailDTO } from '@/types/user'

interface GetUserProfileParams {
  username: string
}

export async function getUserDetails({
  username,
}: GetUserProfileParams): Promise<{ user: UserDetailDTO }> {
  const response = await api.get(`/users/${username}/details`)
  return response.data
}
