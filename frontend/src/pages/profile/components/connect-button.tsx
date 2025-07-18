import { Button } from '@/components/ui/button'
import { useGetConnectionWithUserStatus } from '@/queries/connections/use-get-connection-with-user-status'
import { UserPlus } from 'lucide-react'

interface ConnectButtonProps {
  userId: string
}

export function ConnectButton({ userId }: ConnectButtonProps) {
  const { data, isLoading } = useGetConnectionWithUserStatus(userId)

  if (isLoading) {
    return <Button disabled>Carregando...</Button>
  }

  if (!data) {
    return <Button disabled>Erro</Button>
  }

  const { status } = data.data

  if (status === 'NONE') {
    return (
      <Button>
        <UserPlus className="w-4 h-4 mr-2" />
        Conectar
      </Button>
    )
  }

  if (status === 'PENDING') {
    return (
      <Button>
        <UserPlus className="w-4 h-4 mr-2" />
        Pendente
      </Button>
    )
  }

  if (status === 'DECLINED') {
    return (
      <Button disabled>
        <UserPlus className="w-4 h-4 mr-2" />
        Recusado
      </Button>
    )
  }

  return (
    <Button>
      <UserPlus className="w-4 h-4 mr-2" />
      Desconectar
    </Button>
  )
}
