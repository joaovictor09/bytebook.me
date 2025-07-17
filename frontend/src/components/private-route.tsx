import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/stores/use-auth'

export function PrivateRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return <Outlet />
}
