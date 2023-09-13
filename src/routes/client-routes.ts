// Config
import multer from 'multer'
import multerConfig from '@/lib/multer'

// Repositories
import { Router, Request, Response } from 'express'
import { PrismaCreateClientRepository } from '@/repositories/clientRepositories/createClient/prisma-create-client'
import { CreateClientController } from '@/controllers/clientController/useCases/createClient/create-client'
import { PrismaEditClientRepository } from '@/repositories/clientRepositories/editClient/prisma-edit-client'
import { EditClientController } from '@/controllers/clientController/useCases/editClient/edit-client'
import { GetClientController } from '@/controllers/clientController/useCases/getClient/get-client'
import { PrismaGetClientRepository } from '@/repositories/clientRepositories/getClient/prisma-get-client'
import { PrismaDeleteClientRepository } from '@/repositories/clientRepositories/deleteClient/prisma-delete-client'
import { DeleteClientController } from '@/controllers/clientController/useCases/deleteClient/delete-client'
import { PrismaGetAllClientsRepository } from '@/repositories/clientRepositories/getClients/prisma-get-all-clients'
import { GetAllClientsController } from '@/controllers/clientController/useCases/getClients/get-client'

const routes = Router()
const upload = multer(multerConfig)

// GET ALL CLIENTS
routes.get('/client', async (req: Request, res: Response) => {
  const prismaGetAllClientsRepository = new PrismaGetAllClientsRepository()
  const getAllClientsController = new GetAllClientsController(
    prismaGetAllClientsRepository,
  )
  const { body, statusCode } = await getAllClientsController.handle()
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
routes.delete('/client/:id', async (req: Request, res: Response) => {
  const prismaDeleteClientRepository = new PrismaDeleteClientRepository()
  const deleteClientController = new DeleteClientController(
    prismaDeleteClientRepository,
  )
  const { body, statusCode } = await deleteClientController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
