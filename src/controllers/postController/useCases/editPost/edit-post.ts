import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { Post } from '@prisma/client'
import { IEditPostParams, IEditPostRepository } from './protocols'
import generateImage from '@/utils/generateImage'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { NotFoundError } from '@/errors/not-found-error'

export class EditPostController implements IController {
  constructor(private readonly editPostRepository: IEditPostRepository) {}

  async handle(
    httpRequest: HttpRequest<IEditPostParams>,
  ): Promise<HttpResponse<Post | string>> {
    let body = httpRequest.body
    const id = httpRequest.params.id
    if (httpRequest.file)
      body = generateImage(httpRequest.file.filename, httpRequest.body)
    try {
      const postExists = await this.editPostRepository.exists(id)

      if (!postExists) {
        return notFound(new NotFoundError('Post not Found.'))
      }
      const updatedPost = await this.editPostRepository.editPost(id, body)
      return ok(updatedPost)
    } catch (error: any) {
      return serverError(error.stack)
    }
  }
}
