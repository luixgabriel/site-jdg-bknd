import { Client } from '@prisma/client'

export interface ICreateClientParams {
  name: string
  email: string
  image: string
}

export interface ICreateClientRepository {
  createClient(params?: ICreateClientParams): Promise<Client>
}
