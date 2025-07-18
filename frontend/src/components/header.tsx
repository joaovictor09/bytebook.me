import { Link } from 'react-router'
import { Button } from './ui/button'
import { Code, LogOut, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-[#2D3748] text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Code className="w-6 h-6" />
            devkut
          </h1>
          <nav className="hidden md:flex space-x-6">
            <Link to={'/'} className="hover:underline">
              feed
            </Link>
            <Link to={'/profiles/1'} className="hover:underline">
              perfil
            </Link>

            <Link to="/communities" className="hover:underline text-blue-300">
              comunidades
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
