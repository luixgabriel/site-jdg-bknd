import {
  IGetAllPostParams,
  IGetAllPostsRepository,
} from '@/controllers/postController/useCases/getPosts/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaGetAllPostsRepository implements IGetAllPostsRepository {
  async getAllPosts(navigation: IGetAllPostParams): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      skip: navigation.offset,
      take: navigation.limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        createdAt: true,
        authorId: true,
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })
    return posts
  }
}
