import { api } from '@/lib/api'

interface CreateCommunityRequest {
  name: string
  description: string
}

export function createCommunity(data: CreateCommunityRequest) {
  return api.post(`/communities`, data)
}
