import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  User,
  MapPin,
  MessageCircle,
  Terminal,
  Pencil,
  UserPlus,
  Send,
} from 'lucide-react'
import { useParams } from 'react-router'
import { useAuth } from '@/stores/use-auth'
import { useGetUserById } from '@/queries/users/use-get-user-by-id'
import { Connections } from './components/connections'
import { Communities } from './components/communities'
import { ConnectButton } from './components/connect-button'

export function Profile() {
  const { user: authenticatedUser } = useAuth()
  const { profileId } = useParams() as { profileId: string }
  const isOwnProfile = authenticatedUser?.id === profileId

  const { data, isLoading } = useGetUserById(profileId)

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
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{userData.username}</p>
              <p className="text-sm font-medium mb-2">{userData.title}</p>

              <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
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
                  <ConnectButton userId={profileId} />
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
          <Card className="border-[#E2E8F0]">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold text-[#2D3748]">
                estatísticas
              </h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Perfil visto:</span>
                <span className="font-semibold">
                  {userData.profileViews.toLocaleString()} vezes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conexões:</span>
                <span className="font-semibold">{userData.connections}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Membro desde:</span>
                <span className="font-semibold">{userData.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <Card className="border-[#E2E8F0]">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold text-[#2D3748]">sobre</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
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
              <Card className="border-[#E2E8F0]">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    stack técnica
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conexões */}
            <TabsContent value="connections" className="space-y-4">
              <Connections userId={profileId} />
            </TabsContent>

            {/* Comunidades */}
            <TabsContent value="communities" className="space-y-4">
              <Communities userId={profileId} />
            </TabsContent>
          </Tabs>

          {/* Recados/Mensagens (Simplificado) */}
          <Card className="border-[#E2E8F0]">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold text-[#2D3748] flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                recados ({isOwnProfile ? '5' : '0'})
              </h3>
            </CardHeader>
            <CardContent>
              {isOwnProfile ? (
                <div className="space-y-4">
                  {[
                    {
                      author: 'Pedro Backend',
                      message:
                        'Oi! Vi seu projeto no GitHub, muito legal! Podemos conversar sobre a arquitetura?',
                      time: '2 dias atrás',
                    },
                    {
                      author: 'Ana DevOps',
                      message:
                        'Obrigada pela ajuda com o Docker ontem! Funcionou perfeitamente.',
                      time: '3 dias atrás',
                    },
                  ].map((message, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm text-[#2D3748]">
                            {message.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {message.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="link"
                    className="w-full text-[#2D3748] text-sm"
                  >
                    Ver todos os recados
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Deixe um recado para {userData.name}:
                  </p>
                  <textarea
                    className="w-full border border-gray-200 rounded-md p-3 text-sm"
                    rows={3}
                    placeholder="Escreva sua mensagem..."
                  ></textarea>
                  <Button className="bg-[#2D3748] hover:bg-[#1A202C] text-white">
                    Enviar Recado
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
