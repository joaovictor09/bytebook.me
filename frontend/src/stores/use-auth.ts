import { create } from 'zustand'
import { api } from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
}

interface AuthStore {
  user: User | null
  fetchUser: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  fetchUser: async () => {
    try {
      const res = await api.get('/me')
      set({ user: res.data.user, isLoading: false })
    } catch {
      set({ user: null, isLoading: false })
    }
  },

  logout: async () => {
    await api.post('/logout')
    set({ user: null })
  },
}))
