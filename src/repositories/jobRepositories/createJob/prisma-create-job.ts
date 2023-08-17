import {
  ICreateJobParams,
  ICreateJobRepository,
} from '@/controllers/jobController/useCases/createJob/protocols'
import prisma from '@/lib/prisma'
import { JobOpportunity } from '@prisma/client'

export class PrismaCreateJob implements ICreateJobRepository {
  async createJob(params: ICreateJobParams): Promise<JobOpportunity> {
    const jobOpportunity = await prisma.jobOpportunity.create({
      data: params,
    })
    return jobOpportunity
  }
}
