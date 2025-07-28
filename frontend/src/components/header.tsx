import { Link, useLocation } from '@tanstack/react-router'
import { Button } from './ui/button'
import { useAuth } from '@/pages/_app/-components/auth-context'
import { ThemeToggle } from './theme-toggle'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'

export default function Header() {
  const { logout, user } = useAuth()
  const { pathname } = useLocation()

  return (
    <header className="py-2 shadow drop-shadow-2xl border-b">
      <div className="container mx-auto flex items-center justify-between px-4">
        <nav className="flex flex-row gap-4 h-full items-center">
          <div className="px-2 font-bold">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" className="h-8 w-8" alt="bytebook logo" />
              <h1>bytebook.me</h1>
            </Link>
          </div>

          <Separator orientation="vertical" className="min-h-6" />

          <div className="hidden md:flex space-x-6">
            <HeaderLink isActive={pathname === '/'} title="Home" to="/" />
            <HeaderLink
              isActive={pathname.startsWith('/profile')}
              title="Perfil"
              to={`/profile/$username`}
              params={{
                username: user?.username ?? '',
              }}
            />
            <HeaderLink
              isActive={pathname.startsWith('/communities')}
              title="Comunidades"
              to="/communities"
            />
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

interface HeaderLinkProps {
  isActive: boolean
  title: string
  params?: Record<string, string>
  to: string
}

function HeaderLink({ isActive, title, to, params }: HeaderLinkProps) {
  return (
    <Link
      to={to}
      params={params}
      className={cn(
        isActive
          ? 'font-medium'
          : 'text-muted-foreground hover:text-muted-foreground/80 transition font-medium',
      )}
    >
      {title}
    </Link>
  )
}
