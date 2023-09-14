import { HttpResponse, IController } from '@/interfaces/https'
import { JobOpportunity } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { IGetAllJobsRepository } from './protocols'

export class GetAllJobsController implements IController {
  constructor(private readonly getAllJobsRepository: IGetAllJobsRepository) {}

  async handle(): Promise<HttpResponse<JobOpportunity[]>> {
    try {
      const jobs = await this.getAllJobsRepository.getAllJobs()
      return ok(jobs)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
