// Config
import multer from 'multer'
import multerConfig from '@/lib/multer'

// Repositories
import { Router, Request, Response } from 'express'
import { PrismaGetAllPostsRepository } from '@/repositories/postRepositories/getPosts/prisma-get-all-posts'
import { GetAllPostsController } from '@/controllers/postController/useCases/getPosts/get-all-posts'
import { PrismaDeletePostRepository } from '@/repositories/postRepositories/deletePost/prisma-delete-post'
import { DeletePostController } from '@/controllers/postController/useCases/deletePost/delete-post'
import { PrismaGetPostRepository } from '@/repositories/postRepositories/getPost/prisma-get-post'
import { GetPostController } from '@/controllers/postController/useCases/getPost/get-post'
import { PrismaCreateClientRepository } from '@/repositories/clientRepositories/createClient/prisma-create-client'
import { CreateClientController } from '@/controllers/clientController/useCases/createClient/create-client'
import { PrismaEditClientRepository } from '@/repositories/clientRepositories/editClient/prisma-edit-client'
import { EditClientController } from '@/controllers/clientController/useCases/editClient/edit-client'
import { GetClientController } from '@/controllers/clientController/useCases/getClient/get-client'
import { PrismaGetClientRepository } from '@/repositories/clientRepositories/getClient/prisma-get-client'

const routes = Router()
const upload = multer(multerConfig)

// GET ALL CLIENTS
routes.get('/client', async (req: Request, res: Response) => {
  const prismaGetAllPostsRepository = new PrismaGetAllPostsRepository()
  const getAllPostController = new GetAllPostsController(
    prismaGetAllPostsRepository,
  )
  const { body, statusCode } = await getAllPostController.handle(req)
  res.status(statusCode).json(body)
})

// GET CLIENT BY ID
routes.get('/client/:id', async (req: Request, res: Response) => {
  const prismaGetClientRepository = new PrismaGetClientRepository()
  const getClientController = new GetClientController(prismaGetClientRepository)
  const { body, statusCode } = await getClientController.handle(req)
  res.status(statusCode).json(body)
})

// CREATE CLIENT
routes.post(
  '/client',
  upload.single('IMAGE'),
  async (req: Request, res: Response) => {
    const prismaCreateClientRepository = new PrismaCreateClientRepository()
    const createClientController = new CreateClientController(
      prismaCreateClientRepository,
    )
    const { body, statusCode } = await createClientController.handle(req)
    res.status(statusCode).json(body)
  },
)

// EDIT CLIENT
routes.patch(
  '/client/:id',
  upload.single('IMAGE'),
  async (req: Request, res: Response) => {
    const prismaEditClientRepository = new PrismaEditClientRepository()
    const editClientController = new EditClientController(
      prismaEditClientRepository,
    )

    if (Object.keys(req.body).length === 0 && !req.file) {
      return res
        .status(400)
        .json({ msg: 'At least one field must be provided for update.' })
    }
    const { body, statusCode } = await editClientController.handle(req)
    res.status(statusCode).json(body)
  },
)

// DELETE CLIENT
routes.delete('/Client/:id', async (req: Request, res: Response) => {
  const prismaDeletePostsRepository = new PrismaDeletePostRepository()
  const deletePostController = new DeletePostController(
    prismaDeletePostsRepository,
  )
  const { body, statusCode } = await deletePostController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
