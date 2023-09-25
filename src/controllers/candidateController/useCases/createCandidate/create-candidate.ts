import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { Candidate, Prisma } from '@prisma/client'
import { badRequest, ok, serverError } from '@/helpers/http-helpers'
import { ICreateCandidateParams, ICreateCandidateRepository } from './protocols'
import generatePdf from '@/utils/generatePdf'
import { ZodError } from 'zod'
import { IGetJobRepository } from '@/controllers/jobController/useCases/getJob/protocols'

export class CreateCandidateController implements IController {
  constructor(
    private readonly createCandidateRepository: ICreateCandidateRepository,
    private readonly getJobRepository: IGetJobRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<ICreateCandidateParams>,
  ): Promise<HttpResponse<Candidate | any>> {
    let body = httpRequest.body
    if (httpRequest.file)
      body = generatePdf(httpRequest.file.filename, httpRequest.body)
    try {
      const result = await this.getJobRepository.findCandidateByEmail(
        body?.email,
        body?.jobOpportunities,
      )
      if (result) {
        return badRequest('This candidate is already running for this job.')
      }
      const candidate = await this.createCandidateRepository.createCandidate(
        body,
      )
      return ok(candidate)
    } catch (error: any) {
      console.log(error)
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(', ')
        return badRequest(errorMessages)
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2012') {
          const missingFields = error?.meta?.target as string[] // asserção de tipo aqui
          return badRequest(
            `Missing required field(s): ${missingFields.join(', ')}`,
          )
        }
      }
      return serverError(error)
    }
  }
}
