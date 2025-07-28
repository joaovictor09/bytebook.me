import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@tanstack/react-router'
import { Code, Coffee, Users, Zap } from 'lucide-react'

export function AppSkeleton() {
  return (
    <div className="h-screen flex flex-col gap-4 relative">
      <header className="p-2 shadow drop-shadow-2xl border-b">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="flex flex-row gap-4 h-full items-center">
            <div className="px-2 font-bold">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.svg" className="h-8 w-8" />
                <h1>bytebook.me</h1>
              </Link>
            </div>

            <Separator orientation="vertical" className="min-h-6" />

            <div className="hidden md:flex space-x-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Esquerda */}
        <div className="lg:col-span-1 space-y-4">
          {/* Perfil Resumido Loading */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-3">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="text-center space-y-1">
                    <Skeleton className="h-5 w-8 mx-auto" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <div className="text-center space-y-1">
                    <Skeleton className="h-5 w-6 mx-auto" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comunidades Loading */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-300 animate-pulse" />
                <Skeleton className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center animate-pulse ${
                      i === 1
                        ? 'bg-blue-200'
                        : i === 2
                          ? 'bg-green-200'
                          : 'bg-purple-200'
                    }`}
                  >
                    {i === 1 ? (
                      <Code className="w-4 h-4 text-blue-400" />
                    ) : i === 2 ? (
                      <Zap className="w-4 h-4 text-green-400" />
                    ) : (
                      <Coffee className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              ))}
              <Skeleton className="h-8 w-full rounded" />
            </CardContent>
          </Card>
        </div>

        {/* Feed Principal Loading */}
        <div className="lg:col-span-2 space-y-4">
          {/* Criar Post Loading */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full rounded" />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-9 w-24 rounded" />
              </div>
            </CardContent>
          </Card>

          {/* Posts Loading */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                      {i === 2 && (
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <Skeleton className="h-3 w-3/4 mb-1" />
                          <Skeleton className="h-3 w-2/3 mb-1" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-red-200 rounded animate-pulse"></div>
                        <Skeleton className="h-3 w-8" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-blue-200 rounded animate-pulse"></div>
                        <Skeleton className="h-3 w-12" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-green-200 rounded animate-pulse"></div>
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar Direita Loading */}
        <div className="lg:col-span-1 space-y-4">
          {/* Sugestões de Amigos Loading */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-20" />
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-2 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-7 w-16 rounded" />
                </div>
              ))}
              <Skeleton className="h-7 w-full rounded" />
            </CardContent>
          </Card>

          {/* Comunidades Populares Loading */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded flex items-center justify-center animate-pulse ${
                        i === 1
                          ? 'bg-orange-200'
                          : i === 2
                            ? 'bg-red-200'
                            : 'bg-indigo-200'
                      }`}
                    >
                      <Code
                        className={`w-4 h-4 ${
                          i === 1
                            ? 'text-orange-400'
                            : i === 2
                              ? 'text-red-400'
                              : 'text-indigo-400'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-2 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-7 w-12 rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
