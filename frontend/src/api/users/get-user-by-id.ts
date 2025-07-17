import { api } from '@/lib/api'
import type { User } from '@/types/user'

interface GetUserByIdResponse {
  user: User
}

export function getUserById(id: string) {
  return api.get<GetUserByIdResponse>(`/users/${id}`)
}
