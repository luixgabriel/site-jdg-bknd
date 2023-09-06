import {
  IGetAllPostParams,
  IGetAllPostsRepository,
} from '@/controllers/postController/useCases/getPosts/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaGetAllPostsRepository implements IGetAllPostsRepository {
  async getAllPosts(navigation: IGetAllPostParams): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    })
    return posts
  }
}
