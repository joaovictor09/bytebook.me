import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import {
  Code,
  Coffee,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Zap,
} from 'lucide-react'

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Esquerda */}
      <div className="lg:col-span-1 space-y-4">
        {/* Perfil Resumido */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>EU</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">João Silva</h3>
                <p className="text-sm text-gray-600">Full Stack Developer</p>
              </div>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold">42</div>
                  <div className="text-gray-600">amigos</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">8</div>
                  <div className="text-gray-600">comunidades</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comunidades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Minhas Comunidades
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm">React Developers</div>
                <div className="text-xs text-gray-600">1.2k membros</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm">Node.js Brasil</div>
                <div className="text-xs text-gray-600">856 membros</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm">Café & Código</div>
                <div className="text-xs text-gray-600">423 membros</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              Ver todas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feed Principal */}
      <div className="lg:col-span-2 space-y-4">
        {/* Novo Scrap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Criar Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="O que você está fazendo? Compartilhe um projeto, ideia ou descoberta..."
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Badge variant="secondary">💻 Código</Badge>
                <Badge variant="secondary">🚀 Projeto</Badge>
                <Badge variant="secondary">💡 Discussão</Badge>
              </div>
              <Button>Publicar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Feed de Posts */}
        <div className="space-y-4">
          {/* Post 1 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">Maria Santos</h4>
                    <Badge variant="outline" className="text-xs">
                      React Developer
                    </Badge>
                    <span className="text-sm text-gray-500">2h atrás</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Acabei de finalizar meu primeiro projeto com Next.js 15! 🚀
                    A nova funcionalidade de Server Actions está incrível.
                    Alguém mais testou?
                  </p>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1 hover:text-red-500">
                      <Heart className="w-4 h-4" />
                      <span>12 curtidas</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span>5 comentários</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500">
                      <Share2 className="w-4 h-4" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post 2 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">Pedro Costa</h4>
                    <Badge variant="outline" className="text-xs">
                      Backend Engineer
                    </Badge>
                    <span className="text-sm text-gray-500">4h atrás</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Dica do dia: sempre validem os dados no backend, mesmo que
                    já tenham validação no frontend! Segurança nunca é demais 🔒
                  </p>
                  <div className="bg-gray-100 p-3 rounded-lg mb-3">
                    <code className="text-sm">
                      {`// Exemplo em Node.js
const { body } = req;
if (!body.email || !isValidEmail(body.email)) {
return res.status(400).json({ error: 'Email inválido' });
}`}
                    </code>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1 hover:text-red-500">
                      <Heart className="w-4 h-4" />
                      <span>28 curtidas</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span>8 comentários</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500">
                      <Share2 className="w-4 h-4" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post 3 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">Ana Silva</h4>
                    <Badge variant="outline" className="text-xs">
                      UI/UX Designer
                    </Badge>
                    <span className="text-sm text-gray-500">6h atrás</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Quem mais está animado com as novidades do Figma? O novo
                    sistema de variáveis está revolucionando meu workflow! ✨
                  </p>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1 hover:text-red-500">
                      <Heart className="w-4 h-4" />
                      <span>15 curtidas</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span>3 comentários</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500">
                      <Share2 className="w-4 h-4" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sidebar Direita */}
      <div className="lg:col-span-1 space-y-4">
        {/* Sugestões de Amigos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conecte-se</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>RL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">Rafael Lima</div>
                  <div className="text-xs text-gray-600">DevOps Engineer</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Conectar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>CF</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">Carla Ferreira</div>
                  <div className="text-xs text-gray-600">Mobile Developer</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Conectar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>TS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">Thiago Santos</div>
                  <div className="text-xs text-gray-600">Data Scientist</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Conectar
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="w-full">
              Ver mais sugestões
            </Button>
          </CardContent>
        </Card>

        {/* Comunidades Populares */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Comunidades em Alta</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">TypeScript Brasil</div>
                  <div className="text-xs text-gray-600">2.1k membros</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Entrar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">Laravel Devs</div>
                  <div className="text-xs text-gray-600">1.8k membros</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Entrar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">Freelancers Tech</div>
                  <div className="text-xs text-gray-600">967 membros</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
