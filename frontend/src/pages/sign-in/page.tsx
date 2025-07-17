import { useState } from 'react'
import { signIn } from '@/services/auth'
import { useAuth } from '@/stores/use-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const fetchUser = useAuth((s) => s.fetchUser)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await signIn(email, password)
    await fetchUser()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Senha"
      />
      <Button type="submit">Entrar</Button>
    </form>
  )
}
