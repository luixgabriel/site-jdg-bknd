import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Post } from '@prisma/client'
import { IGetAllPostsRepository } from './protocols'

export class GetAllPostsController implements IController {
  constructor(private readonly getAllPostsRepository: IGetAllPostsRepository) {
    this.getAllPostsRepository = getAllPostsRepository
  }

  async handle(): Promise<HttpResponse<Post[] | any>> {
    try {
      const posts = await this.getAllPostsRepository.getAllPosts()
      return {
        statusCode: 200,
        body: posts,
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
