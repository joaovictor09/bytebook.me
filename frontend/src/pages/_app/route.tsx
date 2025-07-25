import Header from '@/components/header'
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { AppSkeleton } from './-components/skeleton'
import { AuthProvider, useAuth } from './-components/auth-context'

export const Route = createFileRoute('/_app')({
  component: () => (
    <AuthProvider>
      <RouteComponent />
    </AuthProvider>
  ),
})

function RouteComponent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <AppSkeleton />
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Outlet />
    </div>
  )
}
