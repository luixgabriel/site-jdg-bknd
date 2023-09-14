import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { Candidate } from '@prisma/client'
import { NotFoundError } from '@/errors/not-found-error'
import { IGetCandidateRepository } from './protocols'

export class GetCandidateController implements IController {
  constructor(
    private readonly getCandidateRepository: IGetCandidateRepository,
  ) {
    this.getCandidateRepository = getCandidateRepository
  }

  async handle(
    httpRequest: HttpRequest,
  ): Promise<HttpResponse<Candidate | any>> {
    const id = httpRequest.params.id
    try {
      const candidateExists = await this.getCandidateRepository.exists(id)
      if (!candidateExists) {
        return notFound(new NotFoundError('Candidate not Found.'))
      }
      const candidate = await this.getCandidateRepository.getCandidate(
        httpRequest.params.id,
      )
      return ok(candidate)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
