import { useEffect } from 'react'
import { useAuth } from '@/stores/use-auth'

export function useAuthInit() {
  const fetchUser = useAuth((s) => s.fetchUser)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])
}
