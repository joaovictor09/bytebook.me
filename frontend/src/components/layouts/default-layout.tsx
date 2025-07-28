import type { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <main className="container mx-auto px-4 py-6">{children}</main>
}
