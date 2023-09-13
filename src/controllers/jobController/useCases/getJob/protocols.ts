import { JobOpportunity } from '@prisma/client'

export interface IGetJobRepository {
  exists(id: string): Promise<boolean>
  getJob(id: string): Promise<JobOpportunity>
}
