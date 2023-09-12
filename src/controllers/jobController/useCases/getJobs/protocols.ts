import { JobOpportunity } from '@prisma/client'

export interface IGetAllJobsRepository {
  getAllJobs(): Promise<JobOpportunity[]>
}
