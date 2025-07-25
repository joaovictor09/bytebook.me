import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { useAuth } from '@/pages/_app/-components/auth-context'

export default function Header() {
  const { logout } = useAuth()

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <Button onClick={logout}>Sair</Button>
      </nav>
    </header>
  )
}
