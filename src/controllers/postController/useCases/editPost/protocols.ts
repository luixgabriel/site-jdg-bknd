import { Post } from '@prisma/client'

export interface IEditPostParams {
  title?: string
  description?: string
  image?: string
}

export interface IEditPostRepository {
  editPost(id: string, params?: IEditPostParams): Promise<Post>
}
