import {
  ICreatePostParams,
  ICreatePostRepository,
} from '@/controllers/postController/useCases/createPost/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaCreatePostRepository implements ICreatePostRepository {
  async createPost(params: ICreatePostParams): Promise<Post> {
    console.log(params)
    const post = await prisma.post.create({
      data: params,
    })

    return post
  }
}
