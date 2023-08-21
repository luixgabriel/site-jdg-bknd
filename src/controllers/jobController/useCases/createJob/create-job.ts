import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { ICreateJobParams, ICreateJobRepository } from './protocols'
import { JobOpportunity } from '@prisma/client'
import { serverError } from '@/helpers/http-helpers'

export class CreteJobController implements IController {
  constructor(private readonly createJobRepository: ICreateJobRepository) {
    this.createJobRepository = createJobRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateJobParams>,
  ): Promise<HttpResponse<JobOpportunity>> {
    try {
      const jobOpportunity = await this.createJobRepository.createJob(
        httpRequest.body,
      )
      return {
        statusCode: 200,
        body: jobOpportunity,
      }
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
