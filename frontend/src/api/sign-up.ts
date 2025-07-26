import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  username: string
  password: string
}

export async function signUp({ password, username, name }: SignUpBody) {
  await api.post('/accounts', { password, username, name })
}
