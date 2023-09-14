import {
  IEditCandidateParams,
  IEditCandidateRepository,
} from '@/controllers/candidateController/useCases/editCandidate/protocols'
import prisma from '@/lib/prisma'

export class PrismaEditCandidateRepository implements IEditCandidateRepository {
  async exists(id: string): Promise<boolean> {
    const result = await prisma.candidate.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async editCandidate(id: string, params: IEditCandidateParams) {
    const updatedCandidate = await prisma.candidate.update({
      where: {
        id,
      },
      data: params,
    })
    return updatedCandidate
  }
}
