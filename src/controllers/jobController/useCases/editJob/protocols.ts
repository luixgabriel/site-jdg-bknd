import { JobOpportunity } from '@prisma/client'

export interface IEditJobParams {
  title?: string
  description?: string
  stack?: string[]
}

export interface IEditJobRepository {
  editJob(id: string, params?: IEditJobParams): Promise<JobOpportunity>
}
