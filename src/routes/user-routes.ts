import { Router, Request, Response } from 'express'
import { CreateUserController } from '@/controllers/userController/useCases/createUser/create-user'
import { PrismaCreateUserRepository } from '@/repositories/createUser/prisma-create-user'
const routes = Router()

routes.post('/', async (req: Request, res: Response) => {
  const prismaCreateUserRepository = new PrismaCreateUserRepository()
  const createUserController = new CreateUserController(
    prismaCreateUserRepository,
  )
  const { body, statusCode } = await createUserController.handle(req.body)
  res.status(statusCode).send(body)
})

export default routes
