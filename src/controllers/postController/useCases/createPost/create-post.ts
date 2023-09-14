import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreatePostParams, ICreatePostRepository } from './protocols'
import { Post } from '@prisma/client'
import generateImage from '@/utils/generateImage'
import { badRequest, ok, serverError } from '@/helpers/http-helpers'
import postSchema from '@/schemas/post'
import { ZodError } from 'zod'

export class CreatePostController implements IController {
  constructor(private readonly createPostRepository: ICreatePostRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreatePostParams>,
  ): Promise<HttpResponse<Post | string>> {
    let body = httpRequest.body
    if (httpRequest.file)
      body = generateImage(httpRequest.file.filename, httpRequest.body)
    let parsedBody
    try {
      parsedBody = postSchema.parse(body)
    } catch (error: any) {
      if (error instanceof ZodError) {
        const missingFields = error.errors
          .map((err) => err.path[0])
          .filter(Boolean)
          .join(', ')
        return badRequest({
          message: `Missing or invalid field(s): ${missingFields}`,
        })
      }
      return serverError(error)
    }
    try {
      const post = await this.createPostRepository.createPost(parsedBody)
      return ok(post)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
