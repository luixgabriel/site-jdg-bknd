// Config
import multer from 'multer'
import multerConfig from '@/lib/multer'

// Repositories
import { Router, Request, Response } from 'express'
import { PrismaCreatePostRepository } from '@/repositories/postRepositories/createPost/prisma-create-post'
import { CreatePostController } from '@/controllers/postController/useCases/createPost/create-post'
import { PrismaGetAllPostsRepository } from '@/repositories/postRepositories/getPosts/prisma-get-all-posts'
import { GetAllPostsController } from '@/controllers/postController/useCases/getPosts/get-all-posts'
import { PrismaEditPostRepository } from '@/repositories/postRepositories/editPost/prisma-edit-post'
import { EditPostController } from '@/controllers/postController/useCases/editPost/edit-post'
import { PrismaDeletePostRepository } from '@/repositories/postRepositories/deletePost/prisma-delete-post'
import { DeletePostController } from '@/controllers/postController/useCases/deletePost/delete-post'
import { PrismaGetPostRepository } from '@/repositories/postRepositories/getPost/prisma-get-post'
import { GetPostController } from '@/controllers/postController/useCases/getPost/get-post'
import { withAuth } from '@/middlewares/auth/withAuth'
import { PrismaCreateCandidateRepository } from '@/repositories/candidateRepositories/prisma-create-candidate'
import { CreateCandidateController } from '@/controllers/candidateController/useCases/createCandidate/create-candidate'

const routes = Router()
const upload = multer(multerConfig)

// GET ALL POSTS
routes.get('/post', async (req: Request, res: Response) => {
  const prismaGetAllPostsRepository = new PrismaGetAllPostsRepository()
  const getAllPostController = new GetAllPostsController(
    prismaGetAllPostsRepository,
  )
  const { body, statusCode } = await getAllPostController.handle(req)
  res.status(statusCode).json(body)
})

// GET POST BY ID
routes.get('/post/:id', async (req: Request, res: Response) => {
  const prismaGetPostRepository = new PrismaGetPostRepository()
  const getPostController = new GetPostController(prismaGetPostRepository)
  const { body, statusCode } = await getPostController.handle(req)
  res.status(statusCode).json(body)
})

// CREATE CANDIDATE
routes.post(
  '/candidate',
  upload.single('CV'),
  async (req: Request, res: Response) => {
    if (req.file?.mimetype !== 'application/pdf') {
      return res.status(404).json({ msg: 'The format of the CV must be PDF.' })
    }
    const prismaCreateCandidateRepository =
      new PrismaCreateCandidateRepository()
    const createCandidateController = new CreateCandidateController(
      prismaCreateCandidateRepository,
    )
    const { body, statusCode } = await createCandidateController.handle(req)
    res.status(statusCode).json(body)
  },
)

// Edit post
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

// Delete post
routes.delete('/post/:id', async (req: Request, res: Response) => {
  const prismaDeletePostsRepository = new PrismaDeletePostRepository()
  const deletePostController = new DeletePostController(
    prismaDeletePostsRepository,
  )
  const { body, statusCode } = await deletePostController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
