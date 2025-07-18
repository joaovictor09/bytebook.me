import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useGetUserConnections } from '@/queries/connections/use-get-user-connections'
import { User, Users } from 'lucide-react'
import { Link } from 'react-router'

interface ConnectionsProps {
  userId: string
}

export function Connections({ userId }: ConnectionsProps) {
  const { data, isLoading } = useGetUserConnections(userId)

  if (isLoading) {
    return <span>Carregando</span>
  }

  if (!data) {
    return <span>Erro</span>
  }

  const { connections } = data.data

  return (
    <Card className="border-[#E2E8F0]">
      <CardHeader className="pb-2">
        <h3 className="text-sm font-semibold text-[#2D3748] flex items-center gap-2">
          <Users className="w-4 h-4" />
          conexões ({connections.length})
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {connections.map((connection, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <Link
                  to={`/profiles/${connection.user.id}`}
                  className="font-medium text-sm text-[#2D3748]"
                >
                  {connection.user.name}
                </Link>
                <div className="text-xs text-gray-500">Dev cansado(fix)</div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="link" className="w-full mt-4 text-[#2D3748] text-sm">
          Ver todas as conexões
        </Button>
      </CardContent>
    </Card>
  )
}
