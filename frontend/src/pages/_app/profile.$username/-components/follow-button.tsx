import { getUserConnectionStatus } from '@/api/get-user-connection-status'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'

interface FollowButtonProps {
  userId: string
}

export function FollowButton({ userId }: FollowButtonProps) {
  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => getUserConnectionStatus({ userId }),
  })

  if (isLoading) {
    return (
      <Button size={'sm'} disabled variant={'outline'}>
        Carregando...
      </Button>
    )
  }

  // TODO: Implement this validation
  if (!data?.status) {
    return null
  }

  if (data?.status === 'ACCEPTED') {
    return (
      <Button size={'sm'} variant={'destructive'}>
        Parar de seguir
      </Button>
    )
  }

  /**
   * If is the actual user that have declined
   * Must have a send connection button again
   * If is not the actual user, i have to think
   */
  if (data.status === 'DECLINED') {
    return null
  }

  /**
   * TODO:
   * Who send this connection request?
   * If is the authenticated user, must appear a pending button
   * Otherwise must appear a accept or decline request button
   */

  if (data.status === 'PENDING') {
    return (
      <Button size={'sm'} variant={'outline'}>
        Pendente
      </Button>
    )
  }

  return <Button size={'sm'}>Seguir</Button>
}
