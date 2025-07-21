import { api } from '@/lib/api'

export async function signIn(username: string, password: string) {
  await api.post('/sessions', { username, password })
}
