import { JobOpportunity } from '@prisma/client'

export interface IDeleteJobRepository {
  exists(id: string): Promise<boolean>
  deleteJob(id: string): Promise<JobOpportunity>
}
