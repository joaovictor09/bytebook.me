import { Outlet } from 'react-router'
import { useAuthInit } from '@/hooks/use-auth-init'
import { ThemeProvider } from './components/theme-provider'

export function App() {
  useAuthInit()

  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}
