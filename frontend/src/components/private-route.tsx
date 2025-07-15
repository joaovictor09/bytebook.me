import { useAuth } from '@/stores/use-auth'
import { Navigate, Outlet } from 'react-router'

export function PrivateRoute() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />
}
