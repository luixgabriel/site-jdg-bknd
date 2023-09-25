import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { Candidate, Prisma } from '@prisma/client'
import { badRequest, ok, serverError } from '@/helpers/http-helpers'
import { ICreateCandidateParams, ICreateCandidateRepository } from './protocols'
import generatePdf from '@/utils/generatePdf'
import { ZodError } from 'zod'

export class CreateCandidateController implements IController {
  constructor(
    private readonly createCandidateRepository: ICreateCandidateRepository,
  ) {
    createCandidateRepository = this.createCandidateRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateCandidateParams>,
  ): Promise<HttpResponse<Candidate | any>> {
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
