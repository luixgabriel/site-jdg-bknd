import { Post } from '@prisma/client'

export interface IGetPostRepository {
  exists(id: string): Promise<boolean>
  getPost(id: string): Promise<Post | any>
}
