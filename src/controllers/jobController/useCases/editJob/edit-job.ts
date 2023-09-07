import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { forbidden, notFound, ok, serverError } from '@/helpers/http-helpers'
import { InvalidParamError } from '@/errors/invalid-param-error'
import { IEditJobParams, IEditJobRepository } from './protocols'
import { JobOpportunity } from '@prisma/client'
import { NotFoundError } from '@/errors/not-found-error'

export class EditJobController implements IController {
  constructor(private readonly editJobRepository: IEditJobRepository) {
    this.editJobRepository = editJobRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditJobParams>,
  ): Promise<HttpResponse<JobOpportunity | any>> {
    const body = httpRequest.body
    const id = httpRequest.params.id

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