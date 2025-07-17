import { FriendCard } from '@/components/friend-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetCommunityMembers } from '@/queries/communities/use-get-community-members'

interface MembersProps {
  communityId: string
}

export function Members({ communityId }: MembersProps) {
  const { data, isLoading } = useGetCommunityMembers(communityId)

  if (isLoading) {
    return <span>Carregando membros</span>
  }

  if (!data) {
    return <span>Algo deu errado.</span>
  }

  const { communityMembers } = data.data

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
        {communityMembers.map((member, i) => (
          <FriendCard key={i} user={member.user} />
        ))}
      </CardContent>
    </Card>
  )
}
