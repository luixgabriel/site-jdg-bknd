import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'

import { Post } from '@prisma/client'
import { IEditPostParams, IEditPostRepository } from './protocols'

export class EditPostController implements IController {
  constructor(private readonly editPostRepository: IEditPostRepository) {
    editPostRepository = this.editPostRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditPostParams>,
  ): Promise<HttpResponse<Post | any>> {
    const body = httpRequest.body
    console.log(body)
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
      const updatePost = await this.editPostRepository.editPost(id, body)
      return {
        statusCode: 200,
        body: updatePost,
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
