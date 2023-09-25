import { IGetAllCandidatesRepository } from '@/controllers/candidateController/useCases/getCandidates/protocols'
import prisma from '@/lib/prisma'
import { Candidate } from '@prisma/client'

export class PrismaGetAllCandidatesRepository
  implements IGetAllCandidatesRepository
{
  async getAllCandidates(): Promise<Candidate[]> {
    const candidates = prisma.candidate.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        cv: true,
        github: true,
        linkedin: true,
        createdAt: true,
        updatedAt: true,
        applications: true,
        jobOpportunities: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    })
    return candidates
  }
}
