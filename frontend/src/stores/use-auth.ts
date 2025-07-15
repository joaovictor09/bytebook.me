import { api } from '@/lib/api'
import { create } from 'zustand'

type AuthState = {
  accessToken: string | null
  isAuthenticated: boolean
  setAccessToken: (token: string | null) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

export const useAuth = create<AuthState>((set, get) => ({
  accessToken: null,
  isAuthenticated: false,

  setAccessToken: (token) => {
    set({
      accessToken: token,
      isAuthenticated: !!token,
    })
  },

  login: async (email, password) => {
    try {
      const res = await api.post('/sessions', { email, password })
      const { access_token } = res.data

      if (access_token) {
        // Se o refresh_token está vindo no corpo, ideal é mover isso pro cookie no backend.
        // Aqui só armazenamos accessToken em memória.
        get().setAccessToken(access_token)
        return true
      }

      return false
    } catch {
      return false
    }
  },

  logout: async () => {
    await api.post('/logout')
    set({ accessToken: null, isAuthenticated: false })
  },
}))
