import { Post } from '@prisma/client'

export interface IDeletetPostRepository {
  deletePost(id: string): Promise<Post>
}
