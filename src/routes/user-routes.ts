import { Router, Request, Response } from 'express'
import { CreateUserController } from '@/controllers/userController/useCases/createUser/create-user'
import { PrismaCreateUserRepository } from '@/repositories/userRepositories/createUser/prisma-create-user'
const routes = Router()

routes.get('/test', async (req: Request, res: Response) => {
  res.send('oi')
})

routes.post('/save', async (req: Request, res: Response) => {
  const prismaCreateUserRepository = new PrismaCreateUserRepository()
  const createUserController = new CreateUserController(
    prismaCreateUserRepository,
  )
  const { body, statusCode } = await createUserController.handle(req)
  res.status(statusCode).json(body)
})

export default routes
