import { useQuery, useMutation } from '@tanstack/react-query'
import { getMe, type User } from '@/api/get-me'
import { logout as serverLogout } from '@/api/logout'
import { useNavigate } from '@tanstack/react-router'
import { createContext, useContext } from 'react'
import { queryClient } from '@/lib/react-query'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  })

  const { mutateAsync: logoutFn } = useMutation({
    mutationFn: serverLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] })
      navigate({ to: '/sign-in', replace: true })
    },
  })

  function handleLogout() {
    logoutFn()
  }

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        isLoading,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
