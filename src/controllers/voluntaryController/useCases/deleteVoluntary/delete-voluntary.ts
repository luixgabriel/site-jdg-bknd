import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { IDeleteVoluntaryRepository } from './protocols'
import { Post } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'

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
      return ok(deletedVoluntary)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
