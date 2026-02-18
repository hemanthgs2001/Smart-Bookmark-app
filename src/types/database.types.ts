export type Bookmark = {
  id: string
  user_id: string
  title: string
  url: string
  created_at: string
}

export type User = {
  id: string
  email: string
  name: string
  avatar_url?: string
}