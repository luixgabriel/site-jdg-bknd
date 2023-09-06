import {
  IEditJobParams,
  IEditJobRepository,
} from '@/controllers/jobController/useCases/editJob/protocols'
import prisma from '@/lib/prisma'

export class PrismaEditJobRepository implements IEditJobRepository {
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
