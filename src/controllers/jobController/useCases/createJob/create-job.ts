import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { ICreateJobParams, ICreateJobRepository } from './protocols'
import { JobOpportunity } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { z } from 'zod'

export class CreateJobController implements IController {
  constructor(private readonly createJobRepository: ICreateJobRepository) {
    this.createJobRepository = createJobRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateJobParams>,
  ): Promise<HttpResponse<JobOpportunity>> {
    try {
      const JobOpportunity = z.object({
        title: z.string(),
        description: z.string(),
        stack: z.array(z.string()),
        status: z.string().optional(),
      })
      const jobOpportunity = await this.createJobRepository.createJob(
        JobOpportunity.parse(httpRequest.body),
      )
      return ok(jobOpportunity)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
