import type { User } from '@/types/user'

interface FriendCardProps {
  user: User
}

export function FriendCard({ user }: FriendCardProps) {
  return (
    <div className="bg-card text-card-foreground flex flex-col items-center p-2 rounded-xl border shadow-sm">
      <div className="aspect-square bg-secondary rounded-xl w-full" />
      <span className="text-center break-words text-sm">{user.name}</span>
    </div>
  )
}
