import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { useAuth } from '@/pages/_app/-components/auth-context'
import { ThemeToggle } from './theme-toggle'
import { Separator } from './ui/separator'

export default function Header() {
  const { logout } = useAuth()

  return (
    <header className="p-2 shadow drop-shadow-2xl border-b">
      <div className="container mx-auto flex items-center justify-between">
        <nav className="flex flex-row gap-4 h-full items-center">
          <div className="px-2 font-bold">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" className="h-8 w-8" />
              <h1>bytebook.me</h1>
            </Link>
          </div>

          <Separator orientation="vertical" className="min-h-6" />

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium">
              Home
            </Link>
            <Link
              to="/profile"
              className="text-muted-foreground hover:text-muted-foreground/80 transition font-medium"
            >
              Perfil
            </Link>
            <Link
              to="/communities"
              className="text-muted-foreground hover:text-muted-foreground/80 transition font-medium"
            >
              Comunidades
            </Link>
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button onClick={logout} variant={'outline'}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
