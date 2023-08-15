import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { IEditVoluntaryParams, IEditVoluntaryRepository } from './protocols'
import { Voluntary } from '@prisma/client'

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
      return {
        statusCode: 400,
        body: {
          msg: 'Missing ID',
        },
      }
    }
    try {
      const updatedVoluntary = await this.editVoluntaryRepository.editVoluntary(
        id,
        body,
      )
      return {
        statusCode: 200,
        body: updatedVoluntary,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: {
          msg: error,
        },
      }
    }
  }
}
