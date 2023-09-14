import { Candidate, JobOpportunity } from '@prisma/client'
import { ICreateCandidateParams } from '../createCandidate/protocols'

export type IEditCandidateParams = Partial<ICreateCandidateParams>

export interface IEditCandidateRepository {
  exists(id: string): Promise<boolean>
  editCandidate(id: string, params?: IEditCandidateParams): Promise<Candidate>
}
