import { ConnectionStatus } from '@prisma/client'
import { UserDto } from './users.dto'

export type ConnectionDto = {
  id: string
  senderId: string
  recipientId: string
  status: ConnectionStatus
  createdAt: Date
}

export type ConnectionWithUserDto = ConnectionDto & {
  user: UserDto
}
