import { HttpResponse, IController } from '@/interfaces/https'
import { Candidate } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { IGetAllCandidatesRepository } from './protocols'

export class GetAllCandidatesController implements IController {
  constructor(
    private readonly getAllCandidatesRepository: IGetAllCandidatesRepository,
  ) {
    this.getAllCandidatesRepository = getAllCandidatesRepository
  }

  async handle(): Promise<HttpResponse<Candidate[] | any>> {
    try {
      const candidates =
        await this.getAllCandidatesRepository.getAllCandidates()
      return ok(candidates)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
