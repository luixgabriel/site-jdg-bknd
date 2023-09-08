import { Client } from '@prisma/client'

export interface IGetAllClientsRepository {
  getAllClients(): Promise<Client[]>
}
