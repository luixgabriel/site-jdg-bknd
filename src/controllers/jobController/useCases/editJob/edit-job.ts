import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { forbidden, ok, serverError } from '@/helpers/http-helpers'
import { InvalidParamError } from '@/errors/invalid-param-error'
import { IEditJobParams, IEditJobRepository } from './protocols'
import { JobOpportunity } from '@prisma/client'

export class EditJobController implements IController {
  constructor(private readonly editJobRepository: IEditJobRepository) {
    this.editJobRepository = editJobRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditJobParams>,
  ): Promise<HttpResponse<JobOpportunity | any>> {
    const body = httpRequest.body
    const id = httpRequest.params.id
    if (!id) {
      return forbidden(new InvalidParamError('Job Opportunity ID'))
    }
    try {
      const updatedJob = await this.editJobRepository.editJob(id, body)
      return ok(updatedJob)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
