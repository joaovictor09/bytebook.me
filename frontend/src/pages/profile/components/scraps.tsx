import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useFetchScrapsByUserId } from '@/queries/scraps/use-fetch-scraps-by-user-id'
import { MessageCircle, User } from 'lucide-react'
import { SendScrap } from './send-scrap'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router'

interface ScrapsProps {
  userId: string
  isOwnProfile: boolean
}

export function Scraps({ isOwnProfile, userId }: ScrapsProps) {
  const { data, isLoading } = useFetchScrapsByUserId(userId)

  if (isLoading) {
    return <span>Carregando</span>
  }

  if (!data) {
    return <span>Erro</span>
  }

  const { scraps } = data.data

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold  flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          recados ({scraps.length} fix)
        </h3>
      </CardHeader>
      <CardContent>
        {scraps.map((scrap) => (
          <div
            key={scrap.id}
            className="flex items-start space-x-3 p-3 rounded border"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted-foreground">
              <User className="w-4 h-4 text-muted" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <Link
                  to={`/profiles/${scrap.sender.username}`}
                  className="font-medium text-sm "
                >
                  {scrap.sender.name}
                </Link>
                <span className="text-xs ">1 dia atrás(fix)</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{scrap.message}</p>
            </div>
          </div>
        ))}
        {!isOwnProfile && (
          <>
            <Separator className="my-4" />
            <SendScrap userId={userId} />
          </>
        )}
      </CardContent>
    </Card>
  )
}
