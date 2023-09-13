import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { Candidate } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { ICreateCandidateParams, ICreateCandidateRepository } from './protocols'
import generatePdf from '@/utils/generatePdf'

export class CreateCandidateController implements IController {
  constructor(
    private readonly createCandidateRepository: ICreateCandidateRepository,
  ) {
    createCandidateRepository = this.createCandidateRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateCandidateParams>,
  ): Promise<HttpResponse<Candidate | any>> {
    console.log(httpRequest.body)
    let body = httpRequest.body
    if (httpRequest.file)
      body = generatePdf(httpRequest.file.filename, httpRequest.body)
    try {
      const candidate = await this.createCandidateRepository.createCandidate(
        body,
      )
      return ok(candidate)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
