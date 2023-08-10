// Config
import multer from 'multer'
import multerConfig from '@/lib/multer'

// Repositories
import { Router, Request, Response } from 'express'
import { PrismaCreatePostRepository } from '@/repositories/postRepositories/createPost/prisma-create-post'
import { CreatePostController } from '@/controllers/postController/useCases/createPost/create-post'
import { PrismaGetAllPostsRepository } from '@/repositories/postRepositories/getPosts/prisma-get-all-posts'
import { GetAllPostsController } from '@/controllers/postController/useCases/getPosts/getAll-posts'
import { PrismaEditPostRepository } from '@/repositories/postRepositories/editPost/prisma-edit-post'
import { EditPostController } from '@/controllers/postController/useCases/editPost/edit-post'

const routes = Router()
const upload = multer(multerConfig)

// GET ALL POSTS
routes.get('/post', async (req: Request, res: Response) => {
  const prismaGetAllPostsRepository = new PrismaGetAllPostsRepository()
  const getAllPostController = new GetAllPostsController(
    prismaGetAllPostsRepository,
  )
  const { body, statusCode } = await getAllPostController.handle()
  res.status(statusCode).json(body)
})

// CREATE POST
routes.post(
  '/post',
  upload.single('IMAGE'),
  async (req: Request, res: Response) => {
    const prismaCreatePostRepository = new PrismaCreatePostRepository()
    const createPostController = new CreatePostController(
      prismaCreatePostRepository,
    )
    const { body, statusCode } = await createPostController.handle(req)
    res.status(statusCode).json(body)
  },
)

routes.patch(
  '/post/:id',
  upload.single('IMAGE'),
  async (req: Request, res: Response) => {
    const prismaEditPostRepository = new PrismaEditPostRepository()
    const editPostController = new EditPostController(prismaEditPostRepository)

    if (Object.keys(req.body).length === 0 && !req.file) {
      return res
        .status(400)
        .json({ msg: 'At least one field must be provided for update.' })
    }
    const { body, statusCode } = await editPostController.handle(req)
    res.status(statusCode).json(body)
  },
)

export default routes
