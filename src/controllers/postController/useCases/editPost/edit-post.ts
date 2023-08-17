import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { Post } from '@prisma/client'
import { IEditPostParams, IEditPostRepository } from './protocols'
import generateImage from '@/utils/generateImage'
import { ok } from '@/helpers/http-helpers'

export class EditPostController implements IController {
  constructor(private readonly editPostRepository: IEditPostRepository) {
    editPostRepository = this.editPostRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditPostParams>,
  ): Promise<HttpResponse<Post | any>> {
    let body = httpRequest.body
    const id = httpRequest.params.id
    if (httpRequest.file)
      body = generateImage(httpRequest.file.filename, httpRequest.body)
    try {
      const updatedPost = await this.editPostRepository.editPost(id, body)
      return ok(updatedPost)
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
