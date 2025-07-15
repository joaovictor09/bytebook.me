import { useEffect, useState } from 'react'
import { useAuth } from '@/stores/use-auth'
import { api } from '@/lib/api'

export function useAuthInit() {
  const [loading, setLoading] = useState(true)
  const setAccessToken = useAuth((state) => state.setAccessToken)
  const accessToken = useAuth((state) => state.accessToken)

  useEffect(() => {
    async function load() {
      if (accessToken) {
        // Já tem token, não precisa refresh agora
        setLoading(false)
        return
      }
      try {
        const res = await api.post('/refresh')
        const token = res.data.access_token
        setAccessToken(token)
      } catch {
        setAccessToken(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [setAccessToken, accessToken])

  return { loading }
}
