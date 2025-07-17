import { useAuth } from '@/stores/use-auth'
import { Button } from './ui/button'
import { Link } from 'react-router'

export function Header() {
  const { logout, user } = useAuth()

  return (
    <header className="h-16 bg-primary flex items-center justify-center">
      <div className="container h-full flex-1 flex items-center gap-4">
        <div className="flex h-full bg-accent w-max px-4 items-center">
          <span className="text-2xl font-bold text-secondary">bytebook.me</span>
        </div>

        <nav className="space-x-4">
          <span className="text-primary-foreground text-sm font-bold">
            Home
          </span>
          <Link
            to={`/profiles/${user?.id}`}
            className="text-primary-foreground text-sm font-bold"
          >
            Perfil
          </Link>
          <span className="text-primary-foreground text-sm font-bold">
            Scraps
          </span>
          <span className="text-primary-foreground text-sm font-bold">
            Comunidades
          </span>
        </nav>

        <Button
          size={'sm'}
          variant={'outline'}
          onClick={logout}
          className="ml-auto"
        >
          Sair
        </Button>
      </div>
    </header>
  )
}
