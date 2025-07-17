import { useGetUserById } from '@/queries/users/use-get-user-by-id'
import { useParams } from 'react-router'
import { ProfileNotFound } from './components/not-found'
import { UserSidebar } from '@/components/user-sidebar'
import { Communities } from './components/communities'
import { Friends } from './components/friends'

export function Profile() {
  const { profileId } = useParams() as { profileId: string }
  const { isError, isLoading, data } = useGetUserById(profileId)

  if (isError) {
    return <ProfileNotFound />
  }

  if (isLoading) {
    return <span>Carregando</span>
  }

  if (!data) {
    return <span>Algo deu errado</span>
  }

  return (
    <div className="flex gap-4 flex-1">
      <UserSidebar userId={profileId} />

      <div className="w-full"></div>

      <div className="max-w-md w-full space-y-4">
        <Friends userId={profileId} />
        <Communities userId={profileId} />
      </div>
    </div>
  )
}
