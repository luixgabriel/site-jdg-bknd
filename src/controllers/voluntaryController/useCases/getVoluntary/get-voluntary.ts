import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Voluntary } from '@prisma/client'
import { IGetVoluntaryRepository } from './protocols'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { NotFoundError } from '@/errors/not-found-error'

export class GetVoluntaryController implements IController {
  constructor(
    private readonly getVoluntaryRepository: IGetVoluntaryRepository,
  ) {
    getVoluntaryRepository = this.getVoluntaryRepository
  }

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Voluntary>> {
    try {
      const voluntaryExists = await this.getVoluntaryRepository.exists(
        httpRequest.params.id,
      )

      if (!voluntaryExists) {
        return notFound(new NotFoundError('Voluntary not Found.'))
      }
      const voluntary = await this.getVoluntaryRepository.getVoluntary(
        httpRequest.params.id,
      )
      return ok(voluntary)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
