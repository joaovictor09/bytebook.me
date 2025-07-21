import { UserDto } from './users.dto'

export type ScrapDTO = {
  id: string
  message: string
  senderId: string
  recipientId: string
}

export type ScrapWithSenderDTO = ScrapDTO & {
  sender: UserDto
}
