import type { User } from './user'

export type Scrap = {
  id: string
  message: string
  sender: User
}

export type ScrapWithSender = Scrap & {
  sender: User
}
