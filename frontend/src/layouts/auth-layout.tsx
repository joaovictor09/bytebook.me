import { useAuthInit } from '@/hooks/use-auth-init'
import { useAuth } from '@/stores/use-auth'
import { Navigate, Outlet } from 'react-router'

export function AuthLayout() {
  const { user, isLoading } = useAuth()
  useAuthInit()

  if (isLoading) return <p>Carregando...</p>

  if (user) return <Navigate to="/" replace />

  return (
    <div>
      <Outlet />
    </div>
  )
}
