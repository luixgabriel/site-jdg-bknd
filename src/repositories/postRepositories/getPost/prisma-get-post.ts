import { IGetPostRepository } from '@/controllers/postController/useCases/getPost/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaGetPostRepository implements IGetPostRepository {
  async exists(id: string) {
    const result = await prisma.post.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async getPost(id: string): Promise<Post> {
    const post = await prisma.post.findFirst({ where: { id } })
    return post as Post
  }
}
