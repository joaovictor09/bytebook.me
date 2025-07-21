import { Link } from 'react-router'
import { Button } from './ui/button'
import { Code, LogOut, Settings } from 'lucide-react'
import { useAuth } from '@/stores/use-auth'
import { ModeToggle } from './mode-toggle'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Code className="w-6 h-6" />
            devkut
          </h1>
          <nav className="hidden md:flex space-x-6">
            <Link to={'/'} className="hover:underline">
              feed
            </Link>
            <Link
              to={`/profiles/${user?.username}`}
              className="hover:underline"
            >
              perfil
            </Link>

            <Link to="/communities" className="hover:underline">
              comunidades
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ModeToggle />

            <Button size="sm" variant="ghost">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
