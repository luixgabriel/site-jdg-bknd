import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { IDeletetPostRepository } from './protocols'
import { Post } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'

export class DeletePostController implements IController {
  constructor(private readonly deletePostRepository: IDeletetPostRepository) {
    deletePostRepository = this.deletePostRepository
  }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Post>> {
    try {
      const deletedPost = await this.deletePostRepository.deletePost(
        httpRequest.params.id,
      )
      return ok(deletedPost)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
