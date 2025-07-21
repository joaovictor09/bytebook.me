import { api } from '@/lib/api'
import type { ScrapWithSender } from '@/types/scraps'

interface FetchScrapsByUserIdResponse {
  scraps: ScrapWithSender[]
}

export function fetchScrapsByUserId(userId: string) {
  return api.get<FetchScrapsByUserIdResponse>(`/scraps/${userId}`)
}
