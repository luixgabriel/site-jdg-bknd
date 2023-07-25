export interface User {
  id: string
  name: string
  email: string
  password: string
  stack: string[]
  role: string
  authenticationCode?: number
  authenticated: boolean
  authenticationCodeCreatedAt?: Date
}
