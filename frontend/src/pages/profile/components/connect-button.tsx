import { Button } from '@/components/ui/button'
import { useRemoveConnection } from '@/mutations/connections/use-remove-connection'
import { useSentConnection } from '@/mutations/connections/use-sent-connection'
import { useGetConnectionWithUserStatus } from '@/queries/connections/use-get-connection-with-user-status'
import { UserPlus } from 'lucide-react'

interface ConnectButtonProps {
  userId: string
}

export function ConnectButton({ userId }: ConnectButtonProps) {
  const { data, isLoading } = useGetConnectionWithUserStatus(userId)
  const { mutateAsync: removeConnectionMutation } = useRemoveConnection()
  const { mutateAsync: sentConnectionMutation } = useSentConnection()

  if (isLoading) {
    return (
      <Button className="w-full" disabled>
        Carregando...
      </Button>
    )
  }

  if (!data) {
    return (
      <Button className="w-full" disabled>
        Erro
      </Button>
    )
  }

  const { status, connectionId } = data.data

  if (status === 'NONE') {
    return (
      <Button className="w-full" onClick={() => sentConnectionMutation(userId)}>
        <UserPlus className="w-4 h-4 mr-2" />
        Conectar
      </Button>
    )
  }

  if (status === 'PENDING') {
    return (
      <Button className="w-full" disabled>
        <UserPlus className="w-4 h-4 mr-2" />
        Pendente
      </Button>
    )
  }

  if (status === 'DECLINED') {
    return (
      <Button className="w-full" disabled variant={'destructive'}>
        <UserPlus className="w-4 h-4 mr-2" />
        Recusado
      </Button>
    )
  }

  return (
    <Button
      className="w-full"
      variant={'destructive'}
      onClick={() => removeConnectionMutation(connectionId ?? '')}
    >
      <UserPlus className="w-4 h-4 mr-2" />
      Desconectar
    </Button>
  )
}
