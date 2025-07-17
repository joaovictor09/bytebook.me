import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuth } from '@/stores/use-auth'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

export function Home() {
  const { logout, user } = useAuth()

  const { data } = useQuery({
    queryKey: ['communities'],
    queryFn: () => api.get('/communities'),
  })

  return (
    <>
      <span>
        {JSON.stringify(data?.data)}

        <Button onClick={logout}>Sair</Button>

        <Button asChild>
          <Link to={`/profile/${user?.id}`}>Meu perfil</Link>
        </Button>
      </span>
    </>
  )
}
