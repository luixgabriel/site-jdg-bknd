import {
  IGetAllPostParams,
  IGetAllPostsRepository,
} from '@/controllers/postController/useCases/getPosts/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaGetAllPostsRepository implements IGetAllPostsRepository {
  async getAllPosts(navigation: IGetAllPostParams): Promise<Post[]> {
    console.log(navigation)
    const posts = await prisma.post.findMany({
      skip: navigation.offset,
      take: navigation.limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
    })
    return posts
  }
}
