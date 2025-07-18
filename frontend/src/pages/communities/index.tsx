import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Users,
  MessageCircle,
  Plus,
  Terminal,
  UserPlus,
  UserMinus,
} from 'lucide-react'

export function CommunitiesPage() {
  const myCommunitiesData = [
    {
      id: 1,
      name: 'React Developers Brasil',
      description: 'Comunidade para desenvolvedores React do Brasil',
      members: 12543,
      topics: 234,
      isJoined: true,
    },
    {
      id: 2,
      name: 'Python Brasil',
      description: 'Tudo sobre Python no Brasil',
      members: 8765,
      topics: 189,
      isJoined: true,
    },
    {
      id: 3,
      name: 'DevOps & Cloud',
      description: 'Discussões sobre DevOps, AWS, Docker e mais',
      members: 5432,
      topics: 156,
      isJoined: true,
    },
  ]

  const popularCommunitiesData = [
    {
      id: 4,
      name: 'JavaScript Ninjas',
      description: 'Para os mestres do JavaScript',
      members: 15678,
      topics: 445,
      isJoined: false,
    },
    {
      id: 5,
      name: 'Mobile Developers',
      description: 'React Native, Flutter, Swift, Kotlin',
      members: 9876,
      topics: 234,
      isJoined: false,
    },
    {
      id: 6,
      name: 'Freelancers Brasil',
      description: 'Dicas e networking para freelancers',
      members: 7654,
      topics: 189,
      isJoined: false,
    },
  ]

  return (
    <div>
      {/* Busca e Criar Comunidade */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center w-full md:w-auto">
          <Input
            placeholder="Buscar comunidades..."
            className="w-full md:w-64"
          />
          <Button size="sm" variant="ghost" className="ml-2">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Button className="bg-[#2D3748] hover:bg-[#1A202C] text-white w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Criar Comunidade
        </Button>
      </div>

      {/* Minhas Comunidades */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#2D3748] mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Minhas Comunidades
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {myCommunitiesData.map((community) => (
            <Card key={community.id} className="border-[#E2E8F0]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2D3748] mb-1">
                        {community.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {community.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {community.members.toLocaleString()} membros
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {community.topics} tópicos
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-transparent"
                  >
                    <UserMinus className="w-3 h-3 mr-1" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comunidades Populares */}
      <div>
        <h2 className="text-xl font-bold text-[#2D3748] mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Comunidades Populares
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {popularCommunitiesData.map((community) => (
            <Card key={community.id} className="border-[#E2E8F0]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2D3748] mb-1">
                        {community.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {community.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {community.members.toLocaleString()} membros
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {community.topics} tópicos
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#2D3748] hover:bg-[#1A202C] text-white text-xs"
                  >
                    <UserPlus className="w-3 h-3 mr-1" />
                    Participar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Ver Mais */}
      <div className="text-center mt-8">
        <Button variant="outline" className="bg-transparent">
          Explorar Mais Comunidades
        </Button>
      </div>
    </div>
  )
}
