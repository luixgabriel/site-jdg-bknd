import { User } from '@prisma/client'

export interface ICreateUserParams {
  name: string
  email: string
  password: string
  stack: string[]
  role: string
  authenticated: boolean
  authenticationCode: number
  authenticationCodeCreatedAt: Date
}

export interface ICreateUserRepository {
  createUser(params?: ICreateUserParams): Promise<User>
}
