import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Voluntary } from '@prisma/client'
import { IGetVoluntaryRepository } from './protocols'

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
      if (!voluntary) throw new Error('Voluntary not found.')
      return {
        statusCode: 200,
        body: voluntary,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: { msg: 'Voluntary not found' },
      }
    }
  }
}
