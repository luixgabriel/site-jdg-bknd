import { IDeletetPostRepository } from '@/controllers/postController/useCases/deletePost/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaDeletePostRepository implements IDeletetPostRepository {
  async deletePost(id: string): Promise<Post> {
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    })
    return deletedPost
  }
}
