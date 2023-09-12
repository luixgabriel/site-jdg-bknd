import { Router } from 'express'
// import { PrismaCreateUserRepository } from '@/repositories/userRepositories/createUser/createUser/prisma-create-user'
import { validateAndTransformEmail } from '@/middlewares/validators/validatedEmail'
import {
  sendAuthenticationCode,
  verifyAuthenticationCode,
} from '@/controllers/userController/authenticationController'


import { login } from '@/controllers/userController/authenticationController/authenticationUser/loginUser/loginUser'
import { withAuth } from '@/middlewares/auth/withAuth'

import { updateUser } from '@/controllers/userController/useCases/updateUser/updateUser'
import { requestPasswordReset } from '@/controllers/userController/useCases/passwordRecovery/requestPasswordReset'
import { resetPassword } from '@/controllers/userController/useCases/passwordRecovery/resetPassword'
import { createUser } from '@/controllers/userController/useCases/createUser/createUser'
import { deleteUser } from '@/controllers/userController/useCases/deleteUser/deleteUser'
import { getUser } from '@/controllers/userController/useCases/getUser/getUser'
import { getUsers } from '@/controllers/userController/useCases/getUsers/getUser'
import { createUserAdmin } from '@/controllers/userController/useCases/createUserAdmin/createUserAdmin'

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
  '/admin/create', 
  validateAndTransformEmail,
  withAuth,
  createUserAdmin
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

routes.get(
  '/getusers',
  withAuth,
  getUsers
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

routes.post(
  '/passwordrequest',
  requestPasswordReset
)

routes.post(
  '/passwordrecovery',
  resetPassword
)

routes.put(
  '/',
  withAuth,
  updateUser
)

routes.delete(
  '/',
  withAuth,
  deleteUser
)

export default routes
