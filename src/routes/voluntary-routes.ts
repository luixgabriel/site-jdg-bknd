import { CreateVoluntaryController } from '@/controllers/voluntaryController/useCases/createVoluntary/createVouluntary'
import { PrismaCreateVoluntaryRepository } from '@/repositories/voluntaryRepositories/createVoluntary/prisma-create-voluntary'
import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/test', async (req: Request, res: Response) => {
  res.send('oi')
})

routes.post('/voluntary', async (req: Request, res: Response) => {
  const prismaCreateVoluntaryRepository = new PrismaCreateVoluntaryRepository()
  const createVoluntaryController = new CreateVoluntaryController(
    prismaCreateVoluntaryRepository,
  )
  const { body, statusCode } = await createVoluntaryController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
