import { IGetAllJobsRepository } from '@/controllers/jobController/useCases/getJobs/protocols'
import prisma from '@/lib/prisma'
import { JobOpportunity } from '@prisma/client'

export class PrismaGetAllJobsRepository implements IGetAllJobsRepository {
  async getAllJobs(): Promise<JobOpportunity[]> {
    const jobs = prisma.jobOpportunity.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        stack: true,
        createdAt: true,
        updatedAt: true,
        candidates: {
          select: {
            id: true,
            name: true,
            email: true,
            telephone: true,
            cv: true,
            github: true,
            linkedin: true,
          },
        },
      },
    })
    return jobs
  }
}
