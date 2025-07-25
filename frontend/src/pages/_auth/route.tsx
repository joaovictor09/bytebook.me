import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Pizza } from 'lucide-react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg  text-foreground">
          <img className="h-5 w-5" alt="logo" src="/logo.svg" />
          <span className="font-semibold">bytebook.me</span>
        </div>
        <footer className="text-sm">
          &copy; bytebook.me - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
