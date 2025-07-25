import { api } from '@/lib/axios'

export interface SignInBody {
  username: string
  password: string
}

export async function signIn({ password, username }: SignInBody) {
  await api.post('/sessions', { password, username })
}
