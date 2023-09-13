import { JobOpportunity } from '@prisma/client'

export interface ICreateJobParams {
  title: string
  description: string
  stack: string[]
}

export interface ICreateJobRepository {
  createJob(params?: ICreateJobParams): Promise<JobOpportunity>
}
