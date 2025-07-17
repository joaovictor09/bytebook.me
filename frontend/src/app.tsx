import { Outlet } from 'react-router'
import { useAuthInit } from '@/hooks/use-auth-init'

export function App() {
  useAuthInit()

  return <Outlet />
}
