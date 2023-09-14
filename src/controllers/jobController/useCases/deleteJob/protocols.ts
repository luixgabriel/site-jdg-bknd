import { JobOpportunity } from '@prisma/client'

export interface IDeleteJobRepository {
  getJob(id: string): Promise<any>
  deleteJob(id: string): Promise<JobOpportunity>
}
