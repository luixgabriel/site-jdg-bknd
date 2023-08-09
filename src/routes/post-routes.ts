import { Router, Request, Response } from 'express'
import { PrismaCreatePostRepository } from '@/repositories/postRepositories/createPost/prisma-create-post'
import { CreatePostController } from '@/controllers/postController/useCases/createPost/create-post'
import { PrismaGetAllPostsRepository } from '@/repositories/postRepositories/getPosts/prisma-get-all-posts'
import { GetAllPostsController } from '@/controllers/postController/useCases/getPosts/getAll-posts'

const routes = Router()

routes.get('/post', async (req: Request, res: Response) => {
  const prismaGetAllPostsRepository = new PrismaGetAllPostsRepository()
  const getAllPostController = new GetAllPostsController(
    prismaGetAllPostsRepository,
  )
  const { body, statusCode } = await getAllPostController.handle()
  res.status(statusCode).json(body)
})

routes.post('/post', async (req: Request, res: Response) => {
  const prismaCreatePostRepository = new PrismaCreatePostRepository()
  const createPostController = new CreatePostController(
    prismaCreatePostRepository,
  )
  const { body, statusCode } = await createPostController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
