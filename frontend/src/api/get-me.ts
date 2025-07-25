import { api } from '@/lib/axios'

export interface User {
  id: string
  username: string
}

export async function getMe(): Promise<{ user: User }> {
  const response = await api.get('/me')
  return response.data
}
