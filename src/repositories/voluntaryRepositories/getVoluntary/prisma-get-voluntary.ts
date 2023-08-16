import { IGetVoluntaryRepository } from '@/controllers/voluntaryController/useCases/getVoluntary/protocols'
import prisma from '@/lib/prisma'
import { Voluntary } from '@prisma/client'

export class PrismaGetVoluntaryRepository implements IGetVoluntaryRepository {
  async getVoluntary(id: string): Promise<Voluntary> {
    const voluntary = await prisma.voluntary.findFirst({ where: { id } })
    if (!voluntary) throw new Error('Voluntary not found.')
    return voluntary
  }
}
