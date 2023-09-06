import { PrismaCreateJobRepository } from '@/repositories/jobRepositories/createJob/prisma-create-job'
import { CreateJobController } from '@/controllers/jobController/useCases/createJob/create-job'
import { Router, Request, Response } from 'express'
import { PrismaEditJobRepository } from '@/repositories/jobRepositories/editJob/prisma-edit-job'
import { EditJobController } from '@/controllers/jobController/useCases/editJob/edit-job'

const routes = Router()

routes.post('/job-opportunities', async (req: Request, res: Response) => {
  const prismaCreateJobRepository = new PrismaCreateJobRepository()
  const createJobController = new CreateJobController(prismaCreateJobRepository)
  const { body, statusCode } = await createJobController.handle(req)
  res.status(statusCode).json(body)
})

routes.patch('/job-opportunities/:id', async (req: Request, res: Response) => {
  const prismaEditJobRepository = new PrismaEditJobRepository()
  const editJobController = new EditJobController(prismaEditJobRepository)

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ msg: 'At least one field must be provided for update.' })
  }
  const { body, statusCode } = await editJobController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
