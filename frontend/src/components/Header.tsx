import { logout } from '@/api/logout'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'

export default function Header() {
  const navigate = useNavigate()
  const { mutateAsync: logoutFn } = useMutation({ mutationFn: logout })

  async function handleLogout() {
    await logoutFn()

    navigate({
      to: '/sign-in',
      replace: true,
    })
  }

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <Button onClick={handleLogout}>Sair</Button>
      </nav>
    </header>
  )
}
