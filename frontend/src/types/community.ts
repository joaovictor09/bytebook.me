import type { User } from './user'

export type Community = {
  id: string
  name: string
  description: string
  memberCount: string
}

export type CommunityMember = {
  id: string
  user: User
}
