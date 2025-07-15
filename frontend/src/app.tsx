import { Outlet } from 'react-router'
import { useAuthInit } from './hooks/use-auth-init'
import { ThemeProvider } from './components/theme-provider'

export function App() {
  const { loading } = useAuthInit()

  if (loading) {
    return <div>Carregando sessão...</div>
  }

  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}
