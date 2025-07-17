import type { Community } from '@/types/community'

interface CommunityCardProps {
  community: Community
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="bg-card text-card-foreground flex flex-col items-center p-2 rounded-xl border shadow-sm">
      <div className="aspect-square bg-secondary rounded-xl w-full" />
      <span className="text-center break-words text-sm">
        {community.name} ({community.memberCount})
      </span>
    </div>
  )
}
