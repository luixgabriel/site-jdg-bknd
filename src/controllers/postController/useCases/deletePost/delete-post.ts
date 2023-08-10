import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { IDeletetPostRepository } from './protocols'
import { Post } from '@prisma/client'

export class DeletePostController implements IController {
  constructor(private readonly deletePostRepository: IDeletetPostRepository) {
    deletePostRepository = this.deletePostRepository
  }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Post>> {
    try {
      const deletedPost = await this.deletePostRepository.deletePost(
        httpRequest.params.id,
      )
      return {
        statusCode: 200,
        body: deletedPost,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: error,
      }
    }
  }
}
