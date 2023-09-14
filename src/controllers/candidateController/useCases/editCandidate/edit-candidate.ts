import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { IEditCandidateParams, IEditCandidateRepository } from './protocols'
import { Candidate, JobOpportunity } from '@prisma/client'
import { NotFoundError } from '@/errors/not-found-error'

export class EditCandidateController implements IController {
  constructor(
    private readonly editCandidateRepository: IEditCandidateRepository,
  ) {
    this.editCandidateRepository = editCandidateRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditCandidateParams>,
  ): Promise<HttpResponse<Candidate | any>> {
    const body = httpRequest.body
    const id = httpRequest.params.id

    try {
      const candidateExists = await this.editCandidateRepository.exists(id)

      if (!candidateExists) {
        return notFound(new NotFoundError('Candidate not Found.'))
      }

      const updatedCandidate = await this.editCandidateRepository.editCandidate(
        id,
        body,
      )
      return ok(updatedCandidate)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
