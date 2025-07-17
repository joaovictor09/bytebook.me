import { FriendCard } from '@/components/friend-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Friends() {
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
        {Array.from({ length: 6 }).map((_, i) => (
          <FriendCard key={i} />
        ))}
        {/* {data.data.communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))} */}
      </CardContent>
    </Card>
  )
}
