import {
  ICreateClientParams,
  ICreateClientRepository,
} from '@/controllers/clientController/useCases/createClient/protocols'
import prisma from '@/lib/prisma'

export class PrismaCreateClientRepository implements ICreateClientRepository {
  async createClient(params: ICreateClientParams) {
    const client = await prisma.client.create({
      data: params,
    })

    return client
  }
}
