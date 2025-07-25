import { Skeleton } from '@/components/ui/skeleton'

export function AppSkeleton() {
  return (
    <div className="h-screen flex flex-col gap-4 relative">
      <div className="absolute inset-0 bg-linear-to-b to-80% from-background/0 to-background/100 z-50" />
      <Skeleton className="h-16 w-full rounded-none" />

      <div className="flex flex-1 flex-row gap-4 mx-auto w-full py-10 container">
        <Skeleton className="w-96" />
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  )
}
