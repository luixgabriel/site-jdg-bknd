import { Post } from '@prisma/client'
import { ICreatePostParams } from '../createPost/protocols'

export type IEditPostParams = Partial<ICreatePostParams>

export interface IEditPostRepository {
  exists(id: string): Promise<boolean>
  editPost(id: string, params?: IEditPostParams): Promise<Post>
}
