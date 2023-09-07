import {
  IEditPostParams,
  IEditPostRepository,
} from '@/controllers/postController/useCases/editPost/protocols'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'

export class PrismaEditPostRepository implements IEditPostRepository {
  async exists(id: string) {
    const result = await prisma.post.findFirst({
      where: {
        id,
      },
    })
    return result !== null
  }

  async editPost(id: string, params: IEditPostParams): Promise<Post> {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: params,
    })
    return updatedPost
  }
}
