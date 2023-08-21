import { IGetPostRepository } from '@/controllers/postController/useCases/getPost/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaGetPostRepository implements IGetPostRepository {
  async getPost(id: string): Promise<Post> {
    const post = await prisma.post.findFirst({ where: { id } })
    return post as Post
  }
}
