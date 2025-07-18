import { Button } from '@/components/ui/button'
import { useJoinCommunity } from '@/mutations/communities/use-join-community'
import { useLeaveCommunity } from '@/mutations/communities/use-leave-community'
import { useGetUserCommunities } from '@/queries/communities/use-get-user-communities'
import { useAuth } from '@/stores/use-auth'
import { UserMinus, UserPlus } from 'lucide-react'

interface JoinCommunityButtonProps {
  communityId: string
}

export function JoinCommunityButton({ communityId }: JoinCommunityButtonProps) {
  const { user } = useAuth()
  const { mutateAsync: joinCommunityMutation, isPending: isPendingJoin } =
    useJoinCommunity()
  const { mutateAsync: leaveCommunityMutation, isPending: isPendingLeave } =
    useLeaveCommunity()

  const { data, isLoading } = useGetUserCommunities(user?.id ?? '')

  if (!user) {
    return null
  }

  if (isLoading) {
    return (
      <Button className="w-max" disabled>
        Carregando...
      </Button>
    )
  }

  if (!data) {
    return null
  }

  const { communities } = data.data

  const isJoined = communities.some((community) => community.id === communityId)

  if (isJoined) {
    return (
      <Button
        variant={'outline'}
        onClick={() => leaveCommunityMutation(communityId)}
        disabled={isPendingLeave}
      >
        <UserMinus className="w-4 h-4 mr-2" />
        Sair da Comunidade
      </Button>
    )
  }

  return (
    <Button
      variant={'outline'}
      onClick={() => joinCommunityMutation(communityId)}
      disabled={isPendingJoin}
    >
      <UserPlus className="w-4 h-4 mr-2" />
      Participar
    </Button>
  )
}
