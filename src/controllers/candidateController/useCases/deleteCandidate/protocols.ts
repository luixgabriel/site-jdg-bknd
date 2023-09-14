import { Candidate } from '@prisma/client'

export interface IDeleteCandidateRepository {
  exists(id: string): Promise<boolean>
  deleteCandidate(id: string): Promise<Candidate>
}
