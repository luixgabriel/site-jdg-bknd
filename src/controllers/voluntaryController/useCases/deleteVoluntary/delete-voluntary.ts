import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { IDeleteVoluntaryRepository } from './protocols'
import { Post } from '@prisma/client'

export class DeleteVoluntaryController implements IController {
  constructor(
    private readonly deleteVoluntaryRepository: IDeleteVoluntaryRepository,
  ) {
    deleteVoluntaryRepository = this.deleteVoluntaryRepository
  }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Post>> {
    try {
      const deletedVoluntary =
        await this.deleteVoluntaryRepository.deleteVoluntary(
          httpRequest.params.id,
        )
      return {
        statusCode: 200,
        body: deletedVoluntary,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: { msg: 'Voluntary not found.' },
      }
    }
  }
}
