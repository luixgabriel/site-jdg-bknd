import { JobOpportunity } from '@prisma/client'

export interface ICreateJobParams {
  title: string
  description: string
  status: string
  stack: string[]
}

export interface ICreateJobRepository {
  createJob(params?: ICreateJobParams): Promise<JobOpportunity>
}
