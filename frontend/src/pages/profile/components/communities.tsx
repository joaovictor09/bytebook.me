import { CommunityCard } from '@/components/community-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetUserCommunities } from '@/queries/communities/use-get-user-communities'

interface CommunitiesProps {
  userId: string
}

export function Communities({ userId }: CommunitiesProps) {
  const { data, isLoading } = useGetUserCommunities(userId)

  if (isLoading) {
    return <span>Carregando comunidades</span>
  }

  if (!data) {
    return <span>Algo deu errado.</span>
  }

  return (
    <Card className="p-4 gap-2">
      <CardHeader className="pb-0 px-0">
        <CardTitle className="w-full flex items-center justify-between">
          <span>Comunidades</span>
          <Button size={'sm'} variant={'outline'}>
            Ver todos
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-2 px-0">
        {data.data.communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </CardContent>
    </Card>
  )
}
