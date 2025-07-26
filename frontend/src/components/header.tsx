import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { useAuth } from '@/pages/_app/-components/auth-context'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  const { logout } = useAuth()

  return (
    <header className="p-2 shadow drop-shadow-2xl border-b">
      <div className="container mx-auto flex items-center justify-between">
        <nav className="flex flex-row">
          <div className="px-2 font-bold">
            <Link to="/">bytebook.me</Link>
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
