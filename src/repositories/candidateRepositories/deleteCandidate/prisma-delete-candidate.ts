import { IDeleteCandidateRepository } from '@/controllers/candidateController/useCases/deleteCandidate/protocols'
import prisma from '@/lib/prisma'
import { Candidate } from '@prisma/client'

export class PrismaDeleteCandidateRepository
  implements IDeleteCandidateRepository
{
  async exists(id: string) {
    const result = await prisma.candidate.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async deleteCandidate(id: string): Promise<Candidate> {
    const Candidate = await prisma.candidate.delete({
      where: {
        id,
      },
    })

    return Candidate
  }
}
