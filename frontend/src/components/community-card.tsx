import type { Community } from '@/types/community'
import { Link } from 'react-router'

interface CommunityCardProps {
  community: Community
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link
      to={`/communities/${community.id}`}
      className="bg-card text-card-foreground gap-2 flex flex-col items-center p-2 rounded-xl border shadow-sm"
    >
      <div className="aspect-square bg-secondary rounded-xl w-full" />
      <span className="text-center break-words text-sm">
        {community.name} ({community.memberCount})
      </span>
    </Link>
  )
}
