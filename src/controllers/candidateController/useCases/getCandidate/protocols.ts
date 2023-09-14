import { Candidate } from '@prisma/client'

export interface IGetCandidateRepository {
  exists(id: string): Promise<boolean>
  getCandidate(id: string): Promise<Candidate>
}
