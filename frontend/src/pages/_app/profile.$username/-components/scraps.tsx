import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

export function Scraps() {
  return (
    <div className="space-y-4">
      {/* Deixar Scrap */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">
            📝 Livro de Visitas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-700">
            Deixe um recado para João Silva! Os scraps são como bilhetinhos no
            mural.
          </p>
          <div className="flex space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Deixe um recado para João Silva..."
                className="min-h-[80px] bg-white"
              />
              <div className="flex justify-end">
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Scrap
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scraps Recebidos */}
      <div className="space-y-3">
        {/* Scrap 1 */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-l-orange-400">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-orange-800">
                    Maria Santos
                  </h4>
                  <span className="text-sm text-orange-600">
                    deixou um scrap
                  </span>
                  <span className="text-sm text-gray-500">• há 2 horas</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    Oi João! Vi seu último projeto no GitHub, ficou incrível!
                    Parabéns pelo trabalho 🚀 Quando tiver um tempo, me ensina
                    aquela técnica de otimização que você usou?
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scrap 2 */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-400">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>PC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-green-800">Pedro Costa</h4>
                  <span className="text-sm text-green-600">
                    deixou um scrap
                  </span>
                  <span className="text-sm text-gray-500">• há 1 dia</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    Fala João! Obrigado pela ajuda com aquele bug do React. Você
                    salvou meu fim de semana! 😅 Cerveja por minha conta quando
                    nos encontrarmos!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scrap 3 */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-l-purple-400">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-purple-800">Ana Silva</h4>
                  <span className="text-sm text-purple-600">
                    deixou um scrap
                  </span>
                  <span className="text-sm text-gray-500">• há 3 dias</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    João, adorei sua apresentação sobre Clean Code na última
                    meetup! Você tem o dom de explicar conceitos complexos de
                    forma simples ✨
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scrap 4 */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-l-blue-400">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-blue-800">Rafael Lima</h4>
                  <span className="text-sm text-blue-600">deixou um scrap</span>
                  <span className="text-sm text-gray-500">• há 1 semana</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    E aí mano! Saudades dos tempos de faculdade 😄 Vamos marcar
                    um happy hour com a galera da turma? Já faz tempo!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paginação */}
      <div className="flex justify-center pt-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="bg-indigo-100">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
