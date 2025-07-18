import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  MessageCircle,
  User,
  Users,
  Terminal,
  Send,
  Plus,
} from 'lucide-react'

export function Home() {
  // Dados simplificados para o MVP
  const feedData = [
    {
      id: 1,
      author: {
        name: 'Maria Frontend',
        level: 'Senior',
      },
      timestamp: '2 horas atrás',
      content:
        'Acabei de descobrir uma forma mais limpa de fazer debounce no React usando useCallback. Alguém mais usa essa abordagem?',
      tags: ['React', 'Hooks'],
      likes: 12,
      comments: 5,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: 'Pedro Backend',
        level: 'Pleno',
      },
      timestamp: '4 horas atrás',
      content:
        '🚀 Lancei minha primeira API em Node.js! Ainda é simples, mas estou orgulhoso do resultado. Próximo passo: adicionar testes.',
      tags: ['Node.js', 'API'],
      likes: 23,
      comments: 8,
      isLiked: true,
    },
    {
      id: 3,
      author: {
        name: 'Ana DevOps',
        level: 'Senior',
      },
      timestamp: '6 horas atrás',
      content:
        'Dica rápida: sempre usem HTTPS em produção, mesmo para APIs internas. A segurança nunca é demais! 🔒',
      tags: ['DevOps', 'Segurança'],
      likes: 34,
      comments: 12,
      isLiked: false,
    },
    {
      id: 4,
      author: {
        name: 'João Junior',
        level: 'Junior',
      },
      timestamp: '8 horas atrás',
      content:
        'Primeira semana como dev! Ainda estou aprendendo muito, mas a comunidade aqui é incrível. Obrigado pelas dicas pessoal! ❤️',
      tags: ['Carreira', 'Iniciante'],
      likes: 67,
      comments: 24,
      isLiked: true,
    },
    {
      id: 5,
      author: {
        name: 'Carlos Fullstack',
        level: 'Pleno',
      },
      timestamp: '1 dia atrás',
      content:
        'Alguém mais acha que TypeScript mudou completamente a forma como escrevemos JavaScript? Não consigo mais viver sem ele.',
      tags: ['TypeScript', 'JavaScript'],
      likes: 45,
      comments: 18,
      isLiked: false,
    },
  ]

  const myConnections = [
    { name: 'Julia React', title: 'Frontend Dev' },
    { name: 'Bruno Python', title: 'Backend Dev' },
    { name: 'Lara Mobile', title: 'Mobile Dev' },
    { name: 'Diego Data', title: 'Data Scientist' },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Simples */}
        <div className="lg:col-span-1 space-y-4">
          {/* Perfil Resumido */}
          <Card className="border-[#E2E8F0]">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-[#2D3748] mb-1">Seu Nome</h3>
              <p className="text-sm text-gray-600 mb-2">Desenvolvedor</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>conexões: 156</div>
                <div>comunidades: 8</div>
              </div>
            </CardContent>
          </Card>

          {/* Conexões */}
          <Card className="border-[#E2E8F0]">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                <Users className="w-4 h-4" />
                suas conexões
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {myConnections.map((connection, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#2D3748]">
                      {connection.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {connection.title}
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="link"
                className="w-full text-xs text-[#2D3748] p-0 mt-2"
              >
                ver todas
              </Button>
            </CardContent>
          </Card>

          {/* Comunidades Rápidas */}
          <Card className="border-[#E2E8F0]">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                minhas comunidades
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {['React Brasil', 'Python Devs', 'DevOps', 'Iniciantes'].map(
                (community, i) => (
                  <div
                    key={i}
                    className="text-sm text-[#2D3748] hover:underline cursor-pointer py-1"
                  >
                    {community}
                  </div>
                ),
              )}
              <Button
                variant="link"
                className="w-full text-xs text-[#2D3748] p-0 mt-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                explorar mais
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feed Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Criar Post Simples */}
          <Card className="border-[#E2E8F0]">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Compartilhe algo com a comunidade dev..."
                    className="border-gray-200 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-gray-50"
                      >
                        + tag
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#2D3748] hover:bg-[#1A202C] text-white"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts do Feed */}
          <div className="space-y-4">
            {feedData.map((post) => (
              <Card key={post.id} className="border-[#E2E8F0]">
                <CardContent className="p-4">
                  {/* Header do Post */}
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#2D3748]">
                          {post.author.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {post.author.level}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {post.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-2 ${
                        post.isLiked ? 'text-red-500' : 'text-gray-500'
                      } hover:text-red-500`}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`}
                      />
                      <span className="text-sm">{post.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-500 hover:text-blue-500"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Simples */}
          <div className="text-center py-4">
            <Button variant="outline" className="bg-transparent">
              Ver mais posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
