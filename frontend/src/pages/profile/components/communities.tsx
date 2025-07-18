import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useGetUserCommunities } from '@/queries/communities/use-get-user-communities'
import { Terminal } from 'lucide-react'
import { Link } from 'react-router'

interface CommunitiesProps {
  userId: string
}

export function Communities({ userId }: CommunitiesProps) {
  const { data, isLoading } = useGetUserCommunities(userId)

  if (isLoading) {
    return <span>Carregando...</span>
  }

  if (!data) {
    return <span>Erro.</span>
  }

  const { communities } = data.data

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          comunidades
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {communities.map((community, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b"
            >
              <Link
                to={`/communities/${community.id}`}
                className="font-medium text-sm"
              >
                {community.name}
              </Link>
              <div className="text-xs text-muted-foreground">
                {community.memberCount.toLocaleString()} membros
              </div>
            </div>
          ))}
        </div>
        <Button variant="link" className="w-full mt-4 text-sm">
          Ver todas as comunidades
        </Button>
      </CardContent>
    </Card>
  )
}
