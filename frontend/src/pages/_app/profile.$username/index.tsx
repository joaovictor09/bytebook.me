import { DefaultLayout } from '@/components/layouts/default-layout'
import { createFileRoute } from '@tanstack/react-router'
import { ProfileHeader } from './-components/profile-header'
import { About } from './-components/about'
import { RecentConnections } from './-components/recent-connections'
import { Communities } from './-components/communities'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Scraps } from './-components/scraps'
import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '@/api/get-user-details'
import { useAuth } from '../-components/auth-context'

export const Route = createFileRoute('/_app/profile/$username/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        // TODO: implement this
        title: 'cleitinho (Joao Victor) | bytebook.me',
      },
    ],
  }),
})

function RouteComponent() {
  const { user } = useAuth()
  const { username } = Route.useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['user', username, 'details'],
    queryFn: () => getUserDetails({ username }),
  })

  // TODO: Fix thats conditions

  if (isLoading) {
    return (
      <DefaultLayout>
        <span>Is loading...</span>
      </DefaultLayout>
    )
  }

  if (!data) {
    return (
      <DefaultLayout>
        <span>Error occurred! Maybe the user doesnt exists</span>
      </DefaultLayout>
    )
  }

  const { user: userDetails } = data

  const isAuthenticatedUser = user?.username === username

  return (
    <DefaultLayout>
      <ProfileHeader
        isAuthenticatedUser={isAuthenticatedUser}
        communities={userDetails.communities}
        connections={userDetails.connections}
        fullname={userDetails.name}
        location={userDetails.location}
        scraps={userDetails.scraps}
        memberSince={userDetails.memberSince}
        title={userDetails.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <About bio={userDetails.bio} />
          <Communities />
          <RecentConnections />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="scraps" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="scraps">Scraps</TabsTrigger>
              {/* <TabsTrigger value="posts">Posts</TabsTrigger> */}
              {/* <TabsTrigger value="projetos">Projetos</TabsTrigger> */}
              {/* <TabsTrigger value="fotos">Fotos</TabsTrigger> */}
            </TabsList>
            <TabsContent value="scraps">
              <Scraps />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DefaultLayout>
  )
}
