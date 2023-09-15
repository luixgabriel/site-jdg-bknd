import { Post } from '@prisma/client'

export interface ICreatePostParams {
  title: string
  subtitle: string
  description: string
  image?: string
  authorId: string
}

export interface ICreatePostRepository {
  createPost(params?: ICreatePostParams): Promise<Post>
}
