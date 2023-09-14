import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { notFound, ok, serverError } from '@/helpers/http-helpers'

import { JobOpportunity } from '@prisma/client'
import { NotFoundError } from '@/errors/not-found-error'
import { IGetJobRepository } from './protocols'

export class GetJobController implements IController {
  constructor(private readonly getJobRepository: IGetJobRepository) {}

  async handle(
    httpRequest: HttpRequest,
  ): Promise<HttpResponse<JobOpportunity | any>> {
    const id = httpRequest.params.id
    try {
      const jobExists = await this.getJobRepository.exists(id)
      if (!jobExists) {
        return notFound(new NotFoundError('Job not Found.'))
      }
      const job = await this.getJobRepository.getJob(httpRequest.params.id)
      return ok(job)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
