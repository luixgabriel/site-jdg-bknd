import { JobOpportunity } from '@prisma/client'

export interface IEditJobParams {
  title?: string
  description?: string
  category?: string
  stack?: string[]
  endDate?: Date
}

export interface IEditJobRepository {
  exists(id: string): Promise<boolean>
  editJob(id: string, params?: IEditJobParams): Promise<JobOpportunity>
}
