import { IGetClientRepository } from '@/controllers/clientController/useCases/getClient/protocols'
import prisma from '@/lib/prisma'
import { Client } from '@prisma/client'

export class PrismaGetClientRepository implements IGetClientRepository {
  async exists(id: string) {
    const result = await prisma.client.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async getClient(id: string): Promise<Client> {
    const Client = await prisma.client.findFirst({ where: { id } })
    return Client as Client
  }
}
