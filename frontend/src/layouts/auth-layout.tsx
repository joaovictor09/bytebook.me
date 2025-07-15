import { useAuth } from '@/stores/use-auth'
import { Navigate, Outlet } from 'react-router'

export default function AuthLayout() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  )
}
