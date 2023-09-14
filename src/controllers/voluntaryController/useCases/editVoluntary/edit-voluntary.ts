import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { IEditVoluntaryParams, IEditVoluntaryRepository } from './protocols'
import { Voluntary } from '@prisma/client'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { NotFoundError } from '@/errors/not-found-error'

export class EditVoluntaryController implements IController {
  constructor(
    private readonly editVoluntaryRepository: IEditVoluntaryRepository,
  ) {
    this.editVoluntaryRepository = editVoluntaryRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditVoluntaryParams>,
  ): Promise<HttpResponse<Voluntary | string>> {
    const body = httpRequest.body
    const id = httpRequest.params.id
    try {
      const voluntaryExists = await this.editVoluntaryRepository.exists(id)

      if (!voluntaryExists) {
        return notFound(new NotFoundError('Voluntary not Found.'))
      }
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
