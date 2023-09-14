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
      const result = await prisma.candidate.findFirst({
        where: {
          email,
        },
      })
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async createCandidate(params: ICreateCandidateParams): Promise<Candidate> {
    const candidateBD = await this.findByEmail(params.email)
    if (candidateBD) {
      const candidate = await prisma.candidate.update({
        where: {
          email: params.email,
        },
        data: {
          applications: candidateBD.applications + 1,
          jobOpportunities: {
            connect: { id: params.jobOpportunities },
          },
        },
      })

      return candidate
    } else {
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
}
