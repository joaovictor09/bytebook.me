import { api } from '@/lib/api'

export async function signIn(email: string, password: string) {
  await api.post('/sessions', { email, password })
}
