import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RecentConnections() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Conexões Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">Maria Santos</div>
            <div className="text-xs text-gray-600">React Developer</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>PC</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">Pedro Costa</div>
            <div className="text-xs text-gray-600">Backend Engineer</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">Ana Silva</div>
            <div className="text-xs text-gray-600">UI/UX Designer</div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Ver todas (42)
        </Button>
      </CardContent>
    </Card>
  )
}
