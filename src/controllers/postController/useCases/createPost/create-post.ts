import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreatePostParams, ICreatePostRepository } from './protocols'
import { Post } from '@prisma/client'
import generateImage from '@/utils/generateImage'
import { ok } from '@/helpers/http-helpers'

export class CreatePostController implements IController {
  constructor(private readonly createPostRepository: ICreatePostRepository) {
    createPostRepository = this.createPostRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreatePostParams>,
  ): Promise<HttpResponse<Post | any>> {
    let body = httpRequest.body
    if (httpRequest.file)
      body = generateImage(httpRequest.file.filename, httpRequest.body)
    try {
      const post = await this.createPostRepository.createPost(body)
      return ok(post)
    } catch (error) {
      console.log(error)
      return {
        statusCode: 400,
        body: error,
      }
    }
  }
}
