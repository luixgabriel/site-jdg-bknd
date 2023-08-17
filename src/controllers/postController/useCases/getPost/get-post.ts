import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Post } from '@prisma/client'
import { IGetPostRepository } from './protocols'
import { InvalidParamError } from '@/errors/invalid-param-error'
import { forbidden } from '@/helpers/http-helpers'

export class GetPostController implements IController {
  constructor(private readonly getPostRepository: IGetPostRepository) {
    getPostRepository = this.getPostRepository
  }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Post>> {
    try {
      const post = await this.getPostRepository.getPost(httpRequest.params.id)
      if (!post) {
        return forbidden(new InvalidParamError('postID'))
      }
      return {
        statusCode: 200,
        body: post,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      }
    }
  }
}
