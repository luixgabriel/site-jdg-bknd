import { Router, Request, Response } from 'express'
import { PrismaCreatePostRepository } from '@/repositories/postRepositories/createPost/prisma-create-post'
import { CreatePostController } from '@/controllers/postController/useCases/createPost/create-post'

const routes = Router()

routes.post('/post', async (req: Request, res: Response) => {
  const prismaCreatePostRepository = new PrismaCreatePostRepository()
  const createPostController = new CreatePostController(
    prismaCreatePostRepository,
  )
  const { body, statusCode } = await createPostController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
