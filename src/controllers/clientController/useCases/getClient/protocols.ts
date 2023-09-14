import { Client } from '@prisma/client'

export interface IGetClientRepository {
  exists(id: string): Promise<boolean>
  getClient(id: string): Promise<Client | string>
}
