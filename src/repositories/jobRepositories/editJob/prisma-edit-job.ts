import {
  IEditJobParams,
  IEditJobRepository,
} from '@/controllers/jobController/useCases/editJob/protocols'
import prisma from '@/lib/prisma'

export class PrismaEditJobRepository implements IEditJobRepository {
  async exists(id: string): Promise<boolean> {
    const result = await prisma.jobOpportunity.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async editJob(id: string, params: IEditJobParams) {
    const updatedJob = await prisma.jobOpportunity.update({
      where: {
        id,
      },
      data: params,
    })
    return updatedJob
  }
}
