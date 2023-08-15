import {
  IEditVoluntaryParams,
  IEditVoluntaryRepository,
} from '@/controllers/voluntaryController/useCases/editVoluntary/protocols'
import prisma from '@/lib/prisma'

export class PrismaEditVoluntaryRepository implements IEditVoluntaryRepository {
  async editVoluntary(id: string, params: IEditVoluntaryParams) {
    const updatedVoluntary = await prisma.voluntary.update({
      where: {
        id,
      },
      data: params,
    })
    return updatedVoluntary
  }
}
