import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { ICreateJobParams, ICreateJobRepository } from './protocols'
import { JobOpportunity } from '@prisma/client'
import { badRequest, ok, serverError } from '@/helpers/http-helpers'
import { ZodError } from 'zod'
import jobOpportunitySchema from '@/schemas/job-opportunity'

export class CreateJobController implements IController {
  constructor(private readonly createJobRepository: ICreateJobRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateJobParams>,
  ): Promise<HttpResponse<JobOpportunity | string>> {
    const bodyDate = httpRequest.body?.endDate as any
    const BodyAtt = {
      ...httpRequest.body,
      endDate: new Date(bodyDate),
    }
    let parsedBody
    try {
      parsedBody = jobOpportunitySchema.parse(BodyAtt)
    } catch (error: any) {
      if (error instanceof ZodError) {
        const missingFields = error.errors
          .map((err) => err.path[0])
          .filter(Boolean)
          .join(', ')
        return badRequest({
          message: `Missing or invalid field(s): ${missingFields}`,
        })
      }
      return serverError(error)
    }
    try {
      const jobOpportunity = await this.createJobRepository.createJob(
        parsedBody,
      )
      return ok(jobOpportunity)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
