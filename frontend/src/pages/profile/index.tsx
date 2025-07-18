import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  User,
  MapPin,
  Users,
  MessageCircle,
  Terminal,
  Pencil,
  UserPlus,
  Send,
} from 'lucide-react'

export function Profile() {
  const isOwnProfile = true

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

  const connectionsData = [
    { name: 'João Backend', title: 'Backend Dev' },
    { name: 'Ana DevOps', title: 'DevOps Engineer' },
    { name: 'Pedro Mobile', title: 'Mobile Dev' },
    { name: 'Julia Fullstack', title: 'Fullstack Dev' },
    { name: 'Carlos Data', title: 'Data Scientist' },
    { name: 'Lara UX', title: 'UX Designer' },
  ]

  const communitiesData = [
    { name: 'React Brasil', members: 12543 },
    { name: 'Python Devs', members: 8765 },
    { name: 'DevOps & Cloud', members: 5432 },
    { name: 'JavaScript Ninjas', members: 15678 },
    { name: 'Frontend Tips', members: 7654 },
    { name: 'Iniciantes em Programação', members: 23456 },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar com Perfil */}
        <div className="lg:col-span-1 space-y-4">
          {/* Card de Perfil */}
          <Card className="border-[#E2E8F0]">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-[#2D3748] mb-1">
                {userData.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">{userData.username}</p>
              <p className="text-sm font-medium text-[#2D3748] mb-2">
                {userData.title}
              </p>

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
                  <Button className="w-full bg-[#2D3748] hover:bg-[#1A202C] text-white text-sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Conectar
                  </Button>
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
              <Card className="border-[#E2E8F0]">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    conexões ({userData.connections})
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {connectionsData.map((connection, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-[#2D3748]">
                            {connection.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {connection.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="w-full mt-4 text-[#2D3748] text-sm"
                  >
                    Ver todas as conexões
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Comunidades */}
            <TabsContent value="communities" className="space-y-4">
              <Card className="border-[#E2E8F0]">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    comunidades
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {communitiesData.map((community, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-gray-100"
                      >
                        <div className="font-medium text-sm text-[#2D3748]">
                          {community.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {community.members.toLocaleString()} membros
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="w-full mt-4 text-[#2D3748] text-sm"
                  >
                    Ver todas as comunidades
                  </Button>
                </CardContent>
              </Card>
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
