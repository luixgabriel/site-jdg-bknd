import { Router } from 'express'
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

routes.post('/', validateAndTransformEmail, createUser)

routes.post('/admin', validateAndTransformEmail, withAuth, createUserAdmin)

routes.post('/auth/login', validateAndTransformEmail, login)

routes.get('/:id', withAuth, getUser)

routes.get('/all', withAuth, getUsers)

routes.post(
  '/auth/send-code',
  validateAndTransformEmail,
  sendAuthenticationCode,
)

routes.post(
  '/auth/verify-code',
  validateAndTransformEmail,
  verifyAuthenticationCode,
)

routes.post('/password-reset-request', requestPasswordReset)

routes.post('/password-reset', resetPassword)

routes.patch('/:id', withAuth, updateUser)

routes.delete('/:id', withAuth, deleteUser)

export default routes
