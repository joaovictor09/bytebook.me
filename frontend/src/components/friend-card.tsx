import type { User } from '@/types/user'
import { Link } from 'react-router'

interface FriendCardProps {
  user: User
}

export function FriendCard({ user }: FriendCardProps) {
  return (
    <Link
      to={`/profiles/${user.id}`}
      className="bg-card text-card-foreground gap-2 flex flex-col items-center p-2 rounded-xl border shadow-sm"
    >
      <div className="aspect-square bg-secondary rounded-xl w-full" />
      <span className="text-center break-words text-sm">{user.name}</span>
    </Link>
  )
}
