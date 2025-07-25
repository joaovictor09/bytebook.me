import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from './-components/auth-context'

export const Route = createFileRoute('/_app/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()

  return <div>Hello {user?.username}!</div>
}
