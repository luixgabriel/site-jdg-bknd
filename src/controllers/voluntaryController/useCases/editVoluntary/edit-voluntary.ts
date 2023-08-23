import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { IEditVoluntaryParams, IEditVoluntaryRepository } from './protocols'
import { Voluntary } from '@prisma/client'
import { forbidden, ok, serverError } from '@/helpers/http-helpers'
import { InvalidParamError } from '@/errors/invalid-param-error'

export class EditVoluntaryController implements IController {
  constructor(
    private readonly editVoluntaryRepository: IEditVoluntaryRepository,
  ) {
    this.editVoluntaryRepository = editVoluntaryRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditVoluntaryParams>,
  ): Promise<HttpResponse<Voluntary | any>> {
    const body = httpRequest.body
    const id = httpRequest.params.id
    if (!id) {
      return forbidden(new InvalidParamError('voluntary ID'))
    }
    try {
      const updatedVoluntary = await this.editVoluntaryRepository.editVoluntary(
        id,
        body,
      )
      return ok(updatedVoluntary)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}