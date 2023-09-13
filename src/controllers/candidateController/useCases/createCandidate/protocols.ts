import { Candidate } from '@prisma/client'

export interface ICreateCandidateParams {
  name: string
  email: string
  telephone: string
  cv: string
  github: string
  linkedin: string
  applications: number
  jobOpportunities: any
}

export interface ICreateCandidateRepository {
  createCandidate(params?: ICreateCandidateParams): Promise<Candidate>
  findByEmail(email: string): Promise<Candidate | null>
}
