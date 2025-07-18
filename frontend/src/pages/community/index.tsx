import { Input } from '@/components/ui/input'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Users, MessageCircle, Plus, User, Terminal } from 'lucide-react'
import { useGetCommunityDetails } from '@/queries/communities/use-get-community-details'
import { useParams } from 'react-router'
import { JoinCommunityButton } from './components/join-community-button'

export function CommunityPage() {
  const { communityId } = useParams() as {
    communityId: string
  }
  const { data, isPending } = useGetCommunityDetails(communityId)

  const communityData = {
    id: 1,
    name: 'React Developers Brasil',
    description:
      'Comunidade para desenvolvedores React do Brasil. Compartilhe conhecimento, tire dúvidas e conecte-se com outros devs React!',
    members: 12543,
    topics: 234,
    isJoined: true,
    createdAt: 'Janeiro 2023',
  }

  const topicsData = [
    {
      id: 1,
      title: 'Como otimizar re-renders no React?',
      author: 'Maria Frontend',
      replies: 23,
      views: 156,
      lastReply: '2 horas atrás',
    },
    {
      id: 2,
      title: 'Dúvida sobre useEffect com dependências',
      author: 'João Junior',
      replies: 8,
      views: 45,
      lastReply: '4 horas atrás',
    },
    {
      id: 3,
      title: 'Compartilhando meu hook customizado para forms',
      author: 'Ana Pleno',
      replies: 15,
      views: 89,
      lastReply: '1 dia atrás',
    },
    {
      id: 4,
      title: '[RESOLVIDO] Problema com Context API',
      author: 'Carlos Dev',
      replies: 12,
      views: 67,
      lastReply: '2 dias atrás',
    },
  ]

  if (isPending) {
    return <span>Carregando</span>
  }

  if (!data) {
    return <span>Erro</span>
  }

  const { community } = data.data

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Cabeçalho da Comunidade */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start md:items-center flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-muted-foreground rounded flex items-center justify-center">
                <Terminal className="w-8 h-8 text-muted" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{community.name}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {community.memberCount} membros
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {communityData.topics} tópicos
                  </span>
                </div>
              </div>
            </div>
            <JoinCommunityButton communityId={communityId} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Sobre a Comunidade */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">sobre a comunidade</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">{community.description}</p>
              <div className="text-xs text-muted-foreground">
                Criada em {communityData.createdAt}
              </div>
            </CardContent>
          </Card>

          {/* Membros */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold  flex items-center gap-2">
                <Users className="w-4 h-4" />
                membros ({communityData.members.toLocaleString()})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded mb-1 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-2  text-xs p-0">
                ver todos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Criar Tópico (se for membro) */}
          {communityData.isJoined && (
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-sm font-semibold ">criar novo tópico</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Título do tópico"
                  className="w-full border-gray-200"
                />
                <Textarea
                  placeholder="Descreva sua dúvida ou compartilhe algo com a comunidade..."
                  className="w-full border-gray-200"
                  rows={3}
                />
                <Button className="bg-[#2D3748] hover:bg-[#1A202C] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Tópico
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Lista de Tópicos */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold  flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                tópicos recentes
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {topicsData.map((topic) => (
                <div
                  key={topic.id}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium  hover:text-blue-600 cursor-pointer mb-1">
                        {topic.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {topic.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {topic.replies} respostas
                        </span>
                        <span>{topic.lastReply}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
