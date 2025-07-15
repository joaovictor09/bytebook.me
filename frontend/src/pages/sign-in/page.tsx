import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/stores/use-auth'
import { useNavigate } from 'react-router'

export function SignIn() {
  const login = useAuth((state) => state.login)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString() ?? ''
    const password = formData.get('password')?.toString() ?? ''

    const success = await login(email, password)

    if (success) {
      navigate('/')
    } else {
      alert('Credenciais inválidas')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        defaultValue="joaovictordasilva0911@gmail.com"
      />
      <Input type="password" name="password" defaultValue="34622641" />
      <Button type="submit">Entrar</Button>
    </form>
  )
}
