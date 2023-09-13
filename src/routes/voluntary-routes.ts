import { CreateVoluntaryController } from '@/controllers/voluntaryController/useCases/createVoluntary/create-voluntary'
import { DeleteVoluntaryController } from '@/controllers/voluntaryController/useCases/deleteVoluntary/delete-voluntary'
import { EditVoluntaryController } from '@/controllers/voluntaryController/useCases/editVoluntary/edit-voluntary'
import { GetVoluntaryController } from '@/controllers/voluntaryController/useCases/getVoluntary/get-voluntary'
import { GetAllVoluntarysController } from '@/controllers/voluntaryController/useCases/getVoluntarys/get-all-voluntarys'
import { PrismaCreateVoluntaryRepository } from '@/repositories/voluntaryRepositories/createVoluntary/prisma-create-voluntary'
import { PrismaDeleteVoluntaryRepository } from '@/repositories/voluntaryRepositories/deleteVoluntary/prisma-delete-voluntary'
import { PrismaEditVoluntaryRepository } from '@/repositories/voluntaryRepositories/editVoluntary/prisma-edit-voluntary'
import { PrismaGetVoluntaryRepository } from '@/repositories/voluntaryRepositories/getVoluntary/prisma-get-voluntary'
import { PrismaGetAllVoluntarysRepository } from '@/repositories/voluntaryRepositories/getVoluntarys/prisma-get-all-voluntarys'
import { Router, Request, Response } from 'express'

const routes = Router()

// Get all voluntarys
routes.get('/voluntary', async (req: Request, res: Response) => {
  const prismaGetAllVoluntarysRepository =
    new PrismaGetAllVoluntarysRepository()
  const getAllVoluntaryController = new GetAllVoluntarysController(
    prismaGetAllVoluntarysRepository,
  )
  const { body, statusCode } = await getAllVoluntaryController.handle()
  res.status(statusCode).json(body)
})

// GET Voluntary by ID
routes.get('/voluntary/:id', async (req: Request, res: Response) => {
  const prismaGetVoluntaryRepository = new PrismaGetVoluntaryRepository()
  const getPostController = new GetVoluntaryController(
    prismaGetVoluntaryRepository,
  )
  const { body, statusCode } = await getPostController.handle(req)
  res.status(statusCode).json(body)
})

// Create voluntary
routes.post('/voluntary', async (req: Request, res: Response) => {
  const prismaCreateVoluntaryRepository = new PrismaCreateVoluntaryRepository()
  const createVoluntaryController = new CreateVoluntaryController(
    prismaCreateVoluntaryRepository,
  )
  const { body, statusCode } = await createVoluntaryController.handle(req)
  res.status(statusCode).json(body)
})

// Edit voluntary
routes.patch('/voluntary/:id', async (req: Request, res: Response) => {
  const prismaEditVoluntaryRepository = new PrismaEditVoluntaryRepository()
  const editVoluntaryController = new EditVoluntaryController(
    prismaEditVoluntaryRepository,
  )

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ msg: 'At least one field must be provided for update.' })
  }
  const { body, statusCode } = await editVoluntaryController.handle(req)
  res.status(statusCode).json(body)
})

// Delete voluntary
routes.delete('/voluntary/:id', async (req: Request, res: Response) => {
  const prismaDeleteVoluntaryRepository = new PrismaDeleteVoluntaryRepository()
  const deleteVoluntaryController = new DeleteVoluntaryController(
    prismaDeleteVoluntaryRepository,
  )
  const { body, statusCode } = await deleteVoluntaryController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
