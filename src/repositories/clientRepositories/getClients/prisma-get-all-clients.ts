import { IGetAllClientsRepository } from '@/controllers/clientController/useCases/getClients/protocols'
import prisma from '@/lib/prisma'
import { Client } from '@prisma/client'

export class PrismaGetAllClientsRepository implements IGetAllClientsRepository {
  async getAllClients(): Promise<Client[]> {
    const clients = prisma.client.findMany()
    return clients
  }
}
