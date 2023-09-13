import { IGetJobRepository } from '@/controllers/jobController/useCases/getJob/protocols'
import prisma from '@/lib/prisma'
import { JobOpportunity } from '@prisma/client'

export class PrismaGetJobRepository implements IGetJobRepository {
  async exists(id: string) {
    const result = await prisma.jobOpportunity.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async getJob(id: string): Promise<JobOpportunity> {
    const job = await prisma.jobOpportunity.findFirst({
      where: { id },
      include: {
        candidates: true,
      },
    })
    return job as JobOpportunity
  }
}
