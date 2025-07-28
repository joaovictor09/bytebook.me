export type UserDTO = {
  id: string
  name: string
  username: string
}

export type UserDetailDTO = UserDTO & {
  bio: string | null
  location: string | null
  title: string | null
  connections: number
  scraps: number
  communities: number
  memberSince: string
}
