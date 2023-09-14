import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Post } from '@prisma/client'
import { IGetAllPostsRepository } from './protocols'
import { ok, serverError } from '@/helpers/http-helpers'

export class GetAllPostsController implements IController {
  constructor(private readonly getAllPostsRepository: IGetAllPostsRepository) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<Post[] | string>> {
    const page = Number(httpRequest.query.page) || 1
    const limit = Number(httpRequest.query.limit as string) || 10
    const offset = (page - 1) * limit
    try {
      const posts = await this.getAllPostsRepository.getAllPosts({
        page,
        limit,
        offset,
      })
      return ok(posts)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
