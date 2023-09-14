import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { JobOpportunity } from '@prisma/client'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { IDeleteJobRepository } from './protocols'
import { IGetCandidateRepository } from '@/controllers/candidateController/useCases/getCandidate/protocols'
import { IEditCandidateRepository } from '@/controllers/candidateController/useCases/editCandidate/protocols'
import { NotFoundError } from '@/errors/not-found-error'
import { IDeleteCandidateRepository } from '@/controllers/candidateController/useCases/deleteCandidate/protocols'

export class DeleteJobController implements IController {
  constructor(
    private readonly deleteJobRepository: IDeleteJobRepository,
    private readonly getCandidateRepository: IGetCandidateRepository,
    private readonly editCandidateRepository: IEditCandidateRepository,
    private readonly deleteCandidateRepository: IDeleteCandidateRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<JobOpportunity | any>> {
    try {
      const jobBD = await this.deleteJobRepository.getJob(httpRequest.params.id)
      if (!jobBD) {
        return notFound(new NotFoundError('Job not Found.'))
      }

      const candidateUpdates = jobBD.candidates.map(async (item: any) => {
        let candidateBD = await this.getCandidateRepository.getCandidate(
          item.id,
        )
        if (!candidateBD) {
          return notFound(new NotFoundError('Candidate not Found.'))
        }

        candidateBD = await this.editCandidateRepository.editCandidate(
          candidateBD.id,
          { applications: candidateBD.applications - 1 },
        )

        if (candidateBD.applications === 0) {
          await this.deleteCandidateRepository.deleteCandidate(candidateBD.id)
        }
      })

      await Promise.all(candidateUpdates)

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
