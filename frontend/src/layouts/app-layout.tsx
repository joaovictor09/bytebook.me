import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import type { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="space-y-4 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto flex-1">{children}</main>
      <Footer />
    </div>
  )
}
