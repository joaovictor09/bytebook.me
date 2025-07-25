import Header from '@/components/Header'
import { api } from '@/lib/axios'
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { AppSkeleton } from './-components/skeleton'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

interface User {
  id: string
  username: string
}

function RouteComponent() {
  const navigate = Route.useNavigate()
  const [user, setUser] = useState<User | undefined | null>(undefined)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get('/me')

        setUser(response.data)
      } catch {
        setUser(null)
      }
      const response = await api.get('/me')
      if (response.status === 200) {
        setUser(response.data)
      }
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data?.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate({ to: '/sign-in', replace: true })
          }
        }
      },
    )

    return () => {
      getUser()
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  if (user === null) {
    return <Navigate to="/sign-in" />
  }

  if (user === undefined) {
    return <AppSkeleton />
  }

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Outlet />
    </div>
  )
}
