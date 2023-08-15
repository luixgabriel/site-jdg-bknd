import { CreateVoluntaryController } from '@/controllers/voluntaryController/useCases/createVoluntary/createVouluntary'
import { DeleteVoluntaryController } from '@/controllers/voluntaryController/useCases/deleteVoluntary/deleteVoluntary'
import { PrismaCreateVoluntaryRepository } from '@/repositories/voluntaryRepositories/createVoluntary/prisma-create-voluntary'
import { PrismaDeleteVoluntaryRepository } from '@/repositories/voluntaryRepositories/deleteVoluntary/prisma-delete-voluntary'
import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/test', async (req: Request, res: Response) => {
  res.send('oi')
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
