import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { User, MapPin, Terminal, Pencil, Send } from 'lucide-react'
import { useParams } from 'react-router'
import { useAuth } from '@/stores/use-auth'
import { useGetUserByUsername } from '@/queries/users/use-get-user-by-id'
import { Connections } from './components/connections'
import { Communities } from './components/communities'
import { ConnectButton } from './components/connect-button'
import { Scraps } from './components/scraps'

export function Profile() {
  const { user: authenticatedUser } = useAuth()
  const { username } = useParams() as { username: string }
  const isOwnProfile = authenticatedUser?.username === username

  const { data, isLoading } = useGetUserByUsername(username)

  const userData = {
    name: isOwnProfile ? 'Seu Nome' : 'Maria Frontend',
    username: isOwnProfile ? '@seu_username' : '@maria_frontend',
    title: isOwnProfile
      ? 'Desenvolvedor Full Stack'
      : 'Senior Frontend Developer',
    location: 'São Paulo, Brasil',
    bio: isOwnProfile
      ? 'Desenvolvedor apaixonado por criar soluções inovadoras. Sempre aprendendo algo novo!'
      : 'Frontend developer especializada em React e TypeScript. Amo criar interfaces intuitivas e performáticas!',
    joinDate: 'Janeiro 2023',
    profileViews: 1234,
    connections: 156,
    techStack: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Python',
      'PostgreSQL',
    ],
  }

  if (isLoading) {
    return <span>Carregando...</span>
  }

  if (!data) {
    return <span>Usuário não encontrado</span>
  }

  const { user } = data.data

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar com Perfil */}
        <div className="lg:col-span-1 space-y-4">
          {/* Card de Perfil */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-muted-foreground flex items-center justify-center">
                <User className="w-12 h-12 text-muted" />
              </div>
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-sm  mb-1">{userData.username}</p>
              <p className="text-sm font-medium mb-2">{userData.title}</p>

              <div className="flex items-center justify-center gap-1 text-sm  mb-4">
                <MapPin className="w-4 h-4" />
                {userData.location}
              </div>

              {isOwnProfile ? (
                <Button
                  variant="outline"
                  className="w-full text-sm bg-transparent"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <div className="space-y-2">
                  <ConnectButton userId={user.id} />
                  <Button
                    variant="outline"
                    className="w-full text-sm bg-transparent"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card className="">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold ">estatísticas</h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="">Perfil visto:</span>
                <span className="font-semibold">
                  {userData.profileViews.toLocaleString()} vezes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="">Conexões:</span>
                <span className="font-semibold">{userData.connections}</span>
              </div>
              <div className="flex justify-between">
                <span className="">Membro desde:</span>
                <span className="font-semibold">{userData.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <Card className="">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold ">sobre</h3>
            </CardHeader>
            <CardContent>
              <p className=" leading-relaxed">{userData.bio}</p>
            </CardContent>
          </Card>

          {/* Tabs para Conexões e Comunidades */}
          <Tabs defaultValue="tech" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="tech">Stack</TabsTrigger>
              <TabsTrigger value="connections">Conexões</TabsTrigger>
              <TabsTrigger value="communities">Comunidades</TabsTrigger>
            </TabsList>

            {/* Tech Stack */}
            <TabsContent value="tech" className="space-y-4">
              <Card className="">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold  flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    stack técnica
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.techStack.map((tech) => (
                      <Badge key={tech} className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conexões */}
            <TabsContent value="connections" className="space-y-4">
              <Connections userId={user.id} />
            </TabsContent>

            {/* Comunidades */}
            <TabsContent value="communities" className="space-y-4">
              <Communities userId={user.id} />
            </TabsContent>
          </Tabs>

          {/* Recados/Mensagens (Simplificado) */}
          <Scraps isOwnProfile={isOwnProfile} userId={user.id} />
        </div>
      </div>
    </div>
  )
}
