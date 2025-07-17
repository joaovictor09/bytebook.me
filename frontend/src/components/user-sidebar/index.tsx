import { useGetUserById } from '@/queries/users/use-get-user-by-id'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import { UserSidebarLoading } from './loading'
import { useAuth } from '@/stores/use-auth'

interface UserSidebarProps {
  userId: string
}

export function UserSidebar({ userId }: UserSidebarProps) {
  const { isLoading, data } = useGetUserById(userId)
  const { user: currentUser } = useAuth()

  if (isLoading) {
    return <UserSidebarLoading />
  }

  if (!data) {
    throw new Error()
  }

  const { user } = data.data

  const isMe = user.id === currentUser?.id

  if (isMe) {
    return (
      <Card className="w-64 gap-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square bg-secondary rounded-xl" />
          <span>{user.name}</span>
          <span>description</span>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <span>Editar perfil</span>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <span>perfil</span>
          <span>scrapbook</span>
          <span>album</span>
          <span>videos</span>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-64 gap-4 p-4">
      <div className="flex flex-col gap-4">
        <div className="w-full aspect-square bg-secondary" />
        <span>{user.name}</span>
        <span>description</span>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <span>scrapbook</span>
        <span>album</span>
        <span>video</span>
        <span>send message</span>
        <span>write testimonial</span>
      </div>

      <Separator />
    </Card>
  )
}
