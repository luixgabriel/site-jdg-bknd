import { IDeleteClientRepository } from '@/controllers/clientController/useCases/deleteClient/protocols'
import prisma from '@/lib/prisma'
import { Client } from '@prisma/client'

export class PrismaDeleteClientRepository implements IDeleteClientRepository {
  async exists(id: string) {
    const result = await prisma.client.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async deleteClient(id: string): Promise<Client> {
    const client = await prisma.client.delete({
      where: {
        id,
      },
    })

    return client
  }
}
