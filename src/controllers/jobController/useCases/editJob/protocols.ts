import { JobOpportunity } from '@prisma/client'

export interface IEditJobParams {
  title?: string
  description?: string
  stack?: string[]
}

export interface IEditJobRepository {
  exists(id: string): Promise<boolean>
  editJob(id: string, params?: IEditJobParams): Promise<JobOpportunity>
}
