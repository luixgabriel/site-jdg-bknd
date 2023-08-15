import { Post } from '@prisma/client'

export interface IGetPostRepository {
  getPost(id: string): Promise<Post | any>
}
