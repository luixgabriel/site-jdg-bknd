import { IDeleteJobRepository } from '@/controllers/jobController/useCases/deleteJob/protocols'
import prisma from '@/lib/prisma'
import { Client, JobOpportunity } from '@prisma/client'

export class PrismaDeleteJobtRepository implements IDeleteJobRepository {
  async exists(id: string) {
    const result = await prisma.jobOpportunity.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async deleteJob(id: string): Promise<JobOpportunity> {
    const Jobt = await prisma.jobOpportunity.delete({
      where: {
        id,
      },
    })

    return Jobt
  }
}
