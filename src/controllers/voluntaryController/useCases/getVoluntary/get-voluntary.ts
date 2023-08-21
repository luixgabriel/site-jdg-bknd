import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Voluntary } from '@prisma/client'
import { IGetVoluntaryRepository } from './protocols'
import { forbidden, ok, serverError } from '@/helpers/http-helpers'
import { InvalidParamError } from '@/errors/invalid-param-error'

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
      const voluntary = await this.getVoluntaryRepository.getVoluntary(
        httpRequest.params.id,
      )
      if (!voluntary) {
        return forbidden(new InvalidParamError('postID'))
      }
      return ok(voluntary)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
