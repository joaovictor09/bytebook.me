import { useGetCommunityDetails } from '@/queries/communities/use-get-community-details'
import { useParams } from 'react-router'
import { CommunityNotFound } from './components/not-found'
import { JoinButton } from './components/join-button'
import { Members } from './components/members'

export function CommunityPage() {
  const { communityId } = useParams() as { communityId: string }
  const { isError, isLoading, data } = useGetCommunityDetails(communityId)

  if (isError) {
    return <CommunityNotFound />
  }

  if (isLoading) {
    return <span>Carregando</span>
  }

  if (!data) {
    return <span>Algo deu errado</span>
  }

  const { community } = data.data

  return (
    <div className="flex gap-4 flex-col flex-1">
      <span>{community.name}</span>
      <span>Membros: {community.memberCount}</span>

      <JoinButton communityId={communityId} />

      <Members communityId={communityId} />
    </div>
  )
}
