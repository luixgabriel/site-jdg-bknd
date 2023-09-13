import { Client } from '@prisma/client'

export interface IDeleteClientRepository {
  exists(id: string): Promise<boolean>
  deleteClient(id: string): Promise<Client>
}
