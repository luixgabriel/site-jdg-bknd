import { IDeleteVoluntaryRepository } from '@/controllers/voluntaryController/useCases/deleteVoluntary/protocols'
import prisma from '@/lib/prisma'
import { Voluntary } from '@prisma/client'

export class PrismaDeleteVoluntaryRepository
  implements IDeleteVoluntaryRepository
{
  async deleteVoluntary(id: string): Promise<Voluntary> {
    const voluntary = await prisma.voluntary.findUnique({
      where: {
        id,
      },
    })
    if (!voluntary) {
      throw new Error('Voluntary not found.')
    }
    await prisma.voluntary.delete({
      where: {
        id: voluntary.id,
      },
    })

    return voluntary
  }
}
