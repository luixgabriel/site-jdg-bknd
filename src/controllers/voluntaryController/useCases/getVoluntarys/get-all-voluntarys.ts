import { HttpResponse, IController } from '@/interfaces/https'
import { Voluntary } from '@prisma/client'
import { IGetAllVoluntarysRepository } from './protocols'
import { ok, serverError } from '@/helpers/http-helpers'

export class GetAllVoluntarysController implements IController {
  constructor(
    private readonly getAllVoluntarysRepository: IGetAllVoluntarysRepository,
  ) {
    this.getAllVoluntarysRepository = getAllVoluntarysRepository
  }

  async handle(): Promise<HttpResponse<Voluntary[] | string>> {
    try {
      const voluntarys =
        await this.getAllVoluntarysRepository.getAllVoluntarys()
      return ok(voluntarys)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
