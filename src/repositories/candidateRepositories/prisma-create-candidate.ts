import {
  ICreateCandidateParams,
  ICreateCandidateRepository,
} from '@/controllers/candidateController/useCases/createCandidate/protocols'
import prisma from '@/lib/prisma'
import { Candidate } from '@prisma/client'

export class PrismaCreateCandidateRepository
  implements ICreateCandidateRepository
{
  async findByEmail(email: string) {
    try {
      const candidate = await prisma.candidate.findFirst({
        where: {
          email,
        },
      })
      return candidate
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async createCandidate(params: ICreateCandidateParams): Promise<Candidate> {
    const candidate = await prisma.candidate.create({
      data: {
        name: params.name,
        email: params.email,
        telephone: params.telephone,
        cv: params.cv,
        github: params.github,
        linkedin: params.linkedin,
        jobOpportunities: {
          connect: { id: params.jobOpportunities },
        },
      },
    })

    return candidate
  }
}
