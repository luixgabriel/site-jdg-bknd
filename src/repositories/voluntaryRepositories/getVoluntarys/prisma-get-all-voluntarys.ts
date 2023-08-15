import { IGetAllVoluntarysRepository } from '@/controllers/voluntaryController/useCases/getVoluntarys/protocols'
import prisma from '@/lib/prisma'
import { Voluntary } from '@prisma/client'

export class PrismaGetAllVoluntarysRepository
  implements IGetAllVoluntarysRepository
{
  async getAllVoluntarys(): Promise<Voluntary[]> {
    const voluntarys = prisma.voluntary.findMany()
    return voluntarys
  }
}
