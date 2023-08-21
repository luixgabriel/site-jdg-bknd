import { PrismaCreateJobRepository } from '@/repositories/jobRepositories/createJob/prisma-create-job'
import { CreateJobController } from '@/controllers/jobController/useCases/createJob/create-job'
import { Router, Request, Response } from 'express'

const routes = Router()

routes.post('/job-opportunities', async (req: Request, res: Response) => {
  const prismaCreateJobRepository = new PrismaCreateJobRepository()
  const createJobController = new CreateJobController(prismaCreateJobRepository)
  const { body, statusCode } = await createJobController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
