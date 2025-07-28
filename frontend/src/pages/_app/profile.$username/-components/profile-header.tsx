import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Edit, Github, Globe, Linkedin, MapPin } from 'lucide-react'
import { FollowButton } from './follow-button'

interface ProfileHeaderProps {
  isAuthenticatedUser: boolean
  userId: string
  fullname: string
  title: string | null
  location: string | null
  connections: number
  scraps: number
  communities: number
  memberSince: string
}

export function ProfileHeader(props: ProfileHeaderProps) {
  const {
    communities,
    connections,
    fullname,
    location,
    scraps,
    title,
    memberSince,
    isAuthenticatedUser,
    userId,
  } = props

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" />
            <AvatarFallback className="text-2xl">JS</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold">{fullname}</h1>
              {isAuthenticatedUser ? (
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <FollowButton userId={userId} />
              )}
            </div>

            <p className="text-xl text-gray-600 mb-3">{title}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              {location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />

                  <span>{location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Membro desde{' '}
                  {new Date(memberSince).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {connections}
                </div>
                <div className="text-sm text-gray-600">Conexões</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {communities}
                </div>
                <div className="text-sm text-gray-600">Comunidades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {scraps}
                </div>
                <div className="text-sm text-gray-600">Scraps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">23</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                Portfolio
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
