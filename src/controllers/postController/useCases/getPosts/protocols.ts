import { Post } from '@prisma/client'

export interface IGetAllPostsRepository {
  getAllPosts(): Promise<Post[]>
}
