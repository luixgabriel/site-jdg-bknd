import { JobOpportunity } from '@prisma/client'

export interface ICreateJobParams {
  title: string
  description: string
  category: string
  stack: string[]
  endDate: Date
}

export interface ICreateJobRepository {
  createJob(params?: ICreateJobParams): Promise<JobOpportunity>
}
