import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Candidate } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { IDeleteCandidateRepository } from './protocols'

export class DeleteCandidateController implements IController {
  constructor(
    private readonly deleteCandidateRepository: IDeleteCandidateRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Candidate>> {
    try {
      const deletedCandidate =
        await this.deleteCandidateRepository.deleteCandidate(
          httpRequest.params.id,
        )
      return ok(deletedCandidate)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
