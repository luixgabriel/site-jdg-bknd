import { Post } from '@prisma/client'

export interface IGetAllPostParams {
  page?: number
  limit?: number
  offset: number
}
export interface IGetAllPostsRepository {
  getAllPosts(navigation: IGetAllPostParams): Promise<Post[]>
}
