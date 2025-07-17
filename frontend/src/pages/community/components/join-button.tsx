import { Button } from '@/components/ui/button'
import { useJoinCommunity } from '@/mutations/communities/use-join-community'
import { useLeaveCommunity } from '@/mutations/communities/use-leave-community'
import { useGetUserCommunities } from '@/queries/communities/use-get-user-communities'
import { useAuth } from '@/stores/use-auth'

interface JoinButtonProps {
  communityId: string
}

export function JoinButton({ communityId }: JoinButtonProps) {
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
        className="w-max"
        variant={'destructive'}
        onClick={() => leaveCommunityMutation(communityId)}
        disabled={isPendingLeave}
      >
        Sair
      </Button>
    )
  }

  return (
    <Button
      className="w-max"
      onClick={() => joinCommunityMutation(communityId)}
      disabled={isPendingJoin}
    >
      Entrar
    </Button>
  )
}
