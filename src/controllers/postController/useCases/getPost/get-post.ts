import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Post } from '@prisma/client'
import { IGetPostRepository } from './protocols'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { NotFoundError } from '@/errors/not-found-error'

export class GetPostController implements IController {
  constructor(private readonly getPostRepository: IGetPostRepository) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Post | string>> {
    try {
      const postExists = await this.getPostRepository.exists(
        httpRequest.params.id,
      )
      if (!postExists) {
        return notFound(new NotFoundError('Post not Found.'))
      }
      const post = await this.getPostRepository.getPost(httpRequest.params.id)
      return ok(post)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
