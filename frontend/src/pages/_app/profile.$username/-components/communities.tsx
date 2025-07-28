import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Coffee, Users, Zap } from 'lucide-react'

export function Communities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="w-5 h-5" />
          Comunidades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium">React Developers</div>
            <div className="text-sm text-gray-600">1.2k membros</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium">Node.js Brasil</div>
            <div className="text-sm text-gray-600">856 membros</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium">Café & Código</div>
            <div className="text-sm text-gray-600">423 membros</div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Ver todas (8)
        </Button>
      </CardContent>
    </Card>
  )
}
