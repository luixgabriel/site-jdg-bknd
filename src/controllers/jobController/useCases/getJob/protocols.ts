import { JobOpportunity } from '@prisma/client'

export interface IGetJobRepository {
  exists(id: string): Promise<boolean>
  findCandidateByEmail(email: string | undefined, id: string): Promise<boolean>
  getJob(id: string): Promise<JobOpportunity>
}
