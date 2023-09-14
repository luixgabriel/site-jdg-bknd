import { IGetAllCandidatesRepository } from '@/controllers/candidateController/useCases/getCandidates/protocols'
import prisma from '@/lib/prisma'
import { Candidate } from '@prisma/client'

export class PrismaGetAllCandidatesRepository
  implements IGetAllCandidatesRepository
{
  async getAllCandidates(): Promise<Candidate[]> {
    const candidates = prisma.candidate.findMany()
    return candidates
  }
}
