import { Outlet } from 'react-router'
import { useAuthInit } from '@/hooks/use-auth-init'
import { ThemeProvider } from './components/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from './components/ui/sonner'

export function App() {
  useAuthInit()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster richColors />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
