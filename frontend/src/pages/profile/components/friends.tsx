import { FriendCard } from '@/components/friend-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetUserConnections } from '@/queries/connections/use-get-user-connections'

interface FriendsProps {
  userId: string
}

export function Friends({ userId }: FriendsProps) {
  const { data, isLoading } = useGetUserConnections(userId)

  if (isLoading) {
    return <span>Carregando comunidades</span>
  }

  if (!data) {
    return <span>Algo deu errado.</span>
  }

  const { connections } = data.data

  return (
    <Card className="p-4 gap-2">
      <CardHeader className="pb-0 px-0">
        <CardTitle className="w-full flex items-center justify-between">
          <span>Amigos</span>
          <Button size={'sm'} variant={'outline'}>
            Ver todos
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-2 px-0">
        {connections.map((connection, i) => (
          <FriendCard key={i} user={connection.friend} />
        ))}
      </CardContent>
    </Card>
  )
}
