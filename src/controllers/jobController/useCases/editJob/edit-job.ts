import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { IEditJobParams, IEditJobRepository } from './protocols'
import { JobOpportunity } from '@prisma/client'
import { NotFoundError } from '@/errors/not-found-error'

export class EditJobController implements IController {
  constructor(private readonly editJobRepository: IEditJobRepository) {}

  async handle(
    httpRequest: HttpRequest<IEditJobParams>,
  ): Promise<HttpResponse<JobOpportunity | any>> {
    let body = httpRequest.body
    const id = httpRequest.params.id

    if (httpRequest.body?.endDate) {
      body = {
        ...body,
        endDate: new Date(httpRequest.body?.endDate),
      }
    }

    try {
      const jobExists = await this.editJobRepository.exists(id)

      if (!jobExists) {
        return notFound(new NotFoundError('Job not Found.'))
      }

      const updatedJob = await this.editJobRepository.editJob(id, body)
      return ok(updatedJob)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
