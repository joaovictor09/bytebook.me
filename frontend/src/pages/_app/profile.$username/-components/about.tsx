import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AboutProps {
  bio: string | null
}

export function About({ bio }: AboutProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sobre</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-700">{bio ?? 'Não definido'}</p>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Tecnologias</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">PostgreSQL</Badge>
            <Badge variant="secondary">Docker</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
