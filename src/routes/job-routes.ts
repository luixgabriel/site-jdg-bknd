import { PrismaCreateJobRepository } from '@/repositories/jobRepositories/createJob/prisma-create-job'
import { CreateJobController } from '@/controllers/jobController/useCases/createJob/create-job'
import { Router, Request, Response } from 'express'
import { PrismaEditJobRepository } from '@/repositories/jobRepositories/editJob/prisma-edit-job'
import { EditJobController } from '@/controllers/jobController/useCases/editJob/edit-job'
import { PrismaGetAllJobsRepository } from '@/repositories/jobRepositories/getJobs/prisma-get-all-jobs'
import { GetAllJobsController } from '@/controllers/jobController/useCases/getJobs/get-all-jobs'
import { PrismaGetJobRepository } from '@/repositories/jobRepositories/getJob/prisma-get-job'
import { GetJobController } from '@/controllers/jobController/useCases/getJob/get-job'
import { DeleteJobController } from '@/controllers/jobController/useCases/deleteJob/delete-job'
import { PrismaDeleteJobtRepository } from '@/repositories/jobRepositories/deleteJob/prisma-delete-job'
import { PrismaGetCandidateRepository } from '@/repositories/candidateRepositories/getCandidate/prisma-get-candidate'

const routes = Router()

routes.get('/job-opportunities', async (req: Request, res: Response) => {
  const prismaGetAllJobsRepository = new PrismaGetAllJobsRepository()
  const getAllVoluntaryController = new GetAllJobsController(
    prismaGetAllJobsRepository,
  )
  const { body, statusCode } = await getAllVoluntaryController.handle()
  res.status(statusCode).json(body)
})

routes.get('/job-opportunities/:id', async (req: Request, res: Response) => {
  const prismaGetJobRepository = new PrismaGetJobRepository()
  const getJobController = new GetJobController(prismaGetJobRepository)
  const { body, statusCode } = await getJobController.handle(req)
  res.status(statusCode).json(body)
})

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

routes.delete('/job-opportunities/:id', async (req: Request, res: Response) => {
  const prismaDeleteJobRepository = new PrismaDeleteJobtRepository()
  const prismaGetCandidateRepository = new PrismaGetCandidateRepository()
  const deleteJobController = new DeleteJobController(
    prismaDeleteJobRepository,
    prismaGetCandidateRepository,
  )
  const { body, statusCode } = await deleteJobController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
