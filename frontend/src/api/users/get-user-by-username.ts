import { api } from '@/lib/api'
import type { User } from '@/types/user'

interface GetUserByUsernameResponse {
  user: User
}

export function getUserByUsername(username: string) {
  return api.get<GetUserByUsernameResponse>(`/users/${username}`)
}
