import {
  IEditClientParams,
  IEditClientRepository,
} from '@/controllers/clientController/useCases/editClient/protocols'
import prisma from '@/lib/prisma'
import { Client } from '@prisma/client'

export class PrismaEditClientRepository implements IEditClientRepository {
  async exists(id: string) {
    const result = await prisma.client.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async editClient(id: string, params: IEditClientParams): Promise<Client> {
    const updatedClient = await prisma.client.update({
      where: {
        id,
      },
      data: params,
    })
    return updatedClient
  }
}
