import { Candidate } from '@prisma/client'

export interface IGetAllCandidatesRepository {
  getAllCandidates(): Promise<Candidate[]>
}
