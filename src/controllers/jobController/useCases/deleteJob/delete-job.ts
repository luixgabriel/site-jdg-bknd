import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { JobOpportunity } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { IDeleteJobRepository } from './protocols'

export class DeleteJobController implements IController {
  constructor(private readonly deleteJobRepository: IDeleteJobRepository) {
    deleteJobRepository = this.deleteJobRepository
  }

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<JobOpportunity>> {
    try {
      const deletedJob = await this.deleteJobRepository.deleteJob(
        httpRequest.params.id,
      )
      return ok(deletedJob)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
