import { IDeleteJobRepository } from '@/controllers/jobController/useCases/deleteJob/protocols'
import prisma from '@/lib/prisma'
import { JobOpportunity } from '@prisma/client'

export class PrismaDeleteJobtRepository implements IDeleteJobRepository {
  async getJob(id: string) {
    const jobOpportunity = await prisma.jobOpportunity.findUnique({
      where: { id },
      include: { candidates: true },
    })
    return jobOpportunity
  }

  async deleteJob(id: string): Promise<JobOpportunity> {
    const Job = await prisma.jobOpportunity.delete({
      where: {
        id,
      },
    })

    return Job
  }
}
