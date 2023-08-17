import { Client } from '@prisma/client'

export interface ICreateClientParams {
  name: string
  email: string
  logo: string
  document: string
}

export interface ICreateclientRepository {
  createPost(params?: ICreateClientParams): Promise<Client>
}
