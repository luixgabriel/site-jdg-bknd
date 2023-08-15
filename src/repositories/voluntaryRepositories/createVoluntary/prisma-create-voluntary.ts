import {
  ICreateVoluntaryParams,
  ICreateVoluntaryRepository,
} from '@/controllers/voluntaryController/useCases/createVoluntary/protocols'
import prisma from '@/lib/prisma'
import { Voluntary } from '@prisma/client'

export class PrismaCreateVoluntaryRepository
  implements ICreateVoluntaryRepository
{
  async createVoluntary(params: ICreateVoluntaryParams): Promise<Voluntary> {
    const voluntary = await prisma.voluntary.create({
      data: params,
    })

    return voluntary
  }
}
