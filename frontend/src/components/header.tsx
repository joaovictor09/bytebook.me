export function Header() {
  return (
    <header className="h-16 bg-primary flex items-center justify-center">
      <div className="container h-full flex-1 flex items-center gap-4">
        <div className="flex h-full bg-accent w-max px-4 items-center">
          <span className="text-2xl font-bold text-secondary">bytebook.me</span>
        </div>

        <nav className="space-x-4">
          <span className="text-primary-foreground text-sm font-bold">
            Home
          </span>
          <span className="text-primary-foreground text-sm font-bold">
            Perfil
          </span>
          <span className="text-primary-foreground text-sm font-bold">
            Scraps
          </span>
          <span className="text-primary-foreground text-sm font-bold">
            Comunidades
          </span>
        </nav>
      </div>
    </header>
  )
}
