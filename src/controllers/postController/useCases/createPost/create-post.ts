import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreatePostParams, ICreatePostRepository } from './protocols'
import { Post } from '@prisma/client'

export class CreatePostController implements IController {
  constructor(private readonly createPostRepository: ICreatePostRepository) {
    createPostRepository = this.createPostRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreatePostParams>,
  ): Promise<HttpResponse<Post | any>> {
    try {
      const post = await this.createPostRepository.createPost(httpRequest.body)
      return {
        statusCode: 200,
        body: post,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 400,
        body: error,
      }
    }
  }
}
