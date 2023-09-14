import { IGetCandidateRepository } from '@/controllers/candidateController/useCases/getCandidate/protocols'
import prisma from '@/lib/prisma'
import { Candidate } from '@prisma/client'

export class PrismaGetCandidateRepository implements IGetCandidateRepository {
  async exists(id: string) {
    const result = await prisma.candidate.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async getCandidate(id: string): Promise<Candidate> {
    const Candidate = await prisma.candidate.findFirst({
      where: { id },
      include: {
        jobOpportunities: true,
      },
    })
    return Candidate as Candidate
  }
}
