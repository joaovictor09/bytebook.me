import { api } from '@/lib/axios'

export interface User {
  id: string
  username: string
}

interface GetUserProfileParams {
  username: string
}

export async function getUserProfile({
  username,
}: GetUserProfileParams): Promise<{ user: User }> {
  const response = await api.get(`/users/${username}`)
  return response.data
}
