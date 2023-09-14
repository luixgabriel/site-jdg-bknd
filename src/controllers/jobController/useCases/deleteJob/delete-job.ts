import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { JobOpportunity } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { IDeleteJobRepository } from './protocols'
import { IGetCandidateRepository } from '@/controllers/candidateController/useCases/getCandidate/protocols'
import prisma from '@/lib/prisma'

export class DeleteJobController implements IController {
  constructor(
    private readonly deleteJobRepository: IDeleteJobRepository,
    private readonly getCandidateRepository: IGetCandidateRepository,
  ) {
    deleteJobRepository = this.deleteJobRepository
  }

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<JobOpportunity | any>> {
    try {
      const jobBD = await this.deleteJobRepository.getJob(httpRequest.params.id)
      jobBD?.candidates.map(async (item: any) => {
        let candidateBD = await this.getCandidateRepository.getCandidate(
          item.id,
        )
        candidateBD = await prisma.candidate.update({
          where: {
            id: candidateBD.id,
          },
          data: {
            applications: candidateBD.applications - 1,
          },
        })
        console.log(candidateBD)
      })

      const deletedJob = await this.deleteJobRepository.deleteJob(
        httpRequest.params.id,
      )
      return ok(deletedJob)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
