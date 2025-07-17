import type { User } from './user'

export type Connection = {
  status: string
  id: string
  senderId: string
  recipientId: string
  createdAt: Date
  updatedAt: Date
}

export type ConnectionWithFriend = Connection & {
  friend: User
}
