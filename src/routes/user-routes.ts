import { Router, Request, Response } from 'express'
import { CreateUserController } from '@/controllers/userController/useCases/createUser/create-user'
// import { PrismaCreateUserRepository } from '@/repositories/userRepositories/createUser/createUser/prisma-create-user'
import { validateAndTransformEmail } from '@/middlewares/validatedEmail'
import {
  sendAuthenticationCode,
  verifyAuthenticationCode,
} from '@/controllers/userController/authenticationController'
import { createUser } from '@/controllers/userController/createUser/createUser'
import { login } from '@/controllers/userController/authenticationController/loginUser/loginUser'
import { withAuth } from '@/middlewares/auth/withAuth'
import { getUser } from '@/controllers/userController/getUser/getUser'
const routes = Router()

// routes.post('/save', async (req: Request, res: Response) => {
//   const prismaCreateUserRepository = new PrismaCreateUserRepository()
//   const createUserController = new CreateUserController(
//     prismaCreateUserRepository,
//   )
//   const { body, statusCode } = await createUserController.handle(req)
//   res.status(statusCode).json(body)
// })

routes.post(
  '/create',
  validateAndTransformEmail,
  createUser
)

routes.post(
  '/login',
  validateAndTransformEmail,
  login
)

routes.get(
  '/getuser',
  validateAndTransformEmail,
  withAuth,
  getUser
)

routes.post(
  '/authentication/send-code',
  validateAndTransformEmail,
  sendAuthenticationCode,
)

routes.post(
  '/authentication/verify-code',
  validateAndTransformEmail,
  verifyAuthenticationCode,
)

export default routes
