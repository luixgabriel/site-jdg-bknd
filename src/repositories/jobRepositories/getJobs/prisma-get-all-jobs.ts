import { IGetAllJobsRepository } from '@/controllers/jobController/useCases/getJobs/protocols'
import prisma from '@/lib/prisma'
import { JobOpportunity } from '@prisma/client'

export class PrismaGetAllJobsRepository implements IGetAllJobsRepository {
  async getAllJobs(): Promise<JobOpportunity[]> {
    const jobs = prisma.jobOpportunity.findMany()
    return jobs
  }
}
