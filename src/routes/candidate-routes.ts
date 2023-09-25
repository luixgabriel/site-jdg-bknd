// Config
import multer from 'multer'
import multerConfig from '@/lib/multer'

// Repositories
import { Router, Request, Response } from 'express'
import { withAuth } from '@/middlewares/auth/withAuth'
import { PrismaCreateCandidateRepository } from '@/repositories/candidateRepositories/createCandidate/prisma-create-candidate'
import { CreateCandidateController } from '@/controllers/candidateController/useCases/createCandidate/create-candidate'
import { PrismaGetAllCandidatesRepository } from '@/repositories/candidateRepositories/getCandidates/prisma-get-all-candidates'
import { GetAllCandidatesController } from '@/controllers/candidateController/useCases/getCandidates/get-all-candidates'
import { PrismaEditCandidateRepository } from '@/repositories/candidateRepositories/editCandidate/prisma-edit-candidate'
import { EditCandidateController } from '@/controllers/candidateController/useCases/editCandidate/edit-candidate'
import { PrismaDeleteCandidateRepository } from '@/repositories/candidateRepositories/deleteCandidate/prisma-delete-candidate'
import { DeleteCandidateController } from '@/controllers/candidateController/useCases/deleteCandidate/delete-candidate'
import { PrismaGetCandidateRepository } from '@/repositories/candidateRepositories/getCandidate/prisma-get-candidate'
import { GetCandidateController } from '@/controllers/candidateController/useCases/getCandidate/get-candidate'
import { PrismaGetJobRepository } from '@/repositories/jobRepositories/getJob/prisma-get-job'

const routes = Router()
const upload = multer(multerConfig)

// Get all candidates
routes.get('/candidate', async (req: Request, res: Response) => {
  const prismaGetAllCandidatesRepository =
    new PrismaGetAllCandidatesRepository()
  const getAllCandidatesController = new GetAllCandidatesController(
    prismaGetAllCandidatesRepository,
  )
  const { body, statusCode } = await getAllCandidatesController.handle()
  res.status(statusCode).json(body)
})

// Get candidate by id
routes.get('/candidate/:id', async (req: Request, res: Response) => {
  const prismaGetCandidateRepository = new PrismaGetCandidateRepository()
  const getCandidateController = new GetCandidateController(
    prismaGetCandidateRepository,
  )
  const { body, statusCode } = await getCandidateController.handle(req)
  res.status(statusCode).json(body)
})

// Create candidate
routes.post(
  '/candidate',
  withAuth,
  upload.single('CV'),
  async (req: Request, res: Response) => {
    if (req.file?.mimetype !== 'application/pdf') {
      return res.status(404).json({ msg: 'The format of the CV must be PDF.' })
    }
    const prismaCreateCandidateRepository =
      new PrismaCreateCandidateRepository()
    const prismaGetJobRepository = new PrismaGetJobRepository()
    const createCandidateController = new CreateCandidateController(
      prismaCreateCandidateRepository,
      prismaGetJobRepository,
    )
    const { body, statusCode } = await createCandidateController.handle(req)
    res.status(statusCode).json(body)
  },
)

// Edit candidate
routes.patch(
  '/candidate/:id',
  withAuth,
  async (req: Request, res: Response) => {
    const prismaEditCandidateRepository = new PrismaEditCandidateRepository()
    const editCandidateController = new EditCandidateController(
      prismaEditCandidateRepository,
    )

    if (Object.keys(req.body).length === 0 && !req.file) {
      return res.json({
        msg: 'At least one field must be provided for update.',
      })
    }
    const { body, statusCode } = await editCandidateController.handle(req)
    res.status(statusCode).json(body)
  },
)

// Delete candidate
routes.delete(
  '/candidate/:id',
  withAuth,
  async (req: Request, res: Response) => {
    const prismaDeleteCandidateRepository =
      new PrismaDeleteCandidateRepository()
    const deletePostController = new DeleteCandidateController(
      prismaDeleteCandidateRepository,
    )
    const { body, statusCode } = await deletePostController.handle(req)
    res.status(statusCode).json(body)
  },
)

export default routes
