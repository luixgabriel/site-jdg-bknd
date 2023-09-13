import { passwordValidator } from '@/middlewares/validators/passwordValidator'
import { getUserPrisma } from '@/repositories/userRepositories/getUser/prisma-get-user'
import { updatePasswordUserPrisma } from '@/repositories/userRepositories/useCases/passwordRecovery/prisma-update-password'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { isWithinTimeLimit } from '@/utils/authUtils/isWithinTimeLimit'

export const resetPassword = async (req: Request, res: Response) => {
  const { email, confirmationCode, newPassword } = req.body

  if (!email || !confirmationCode || !newPassword) {
    return res.status(400).json({
      error: 'Email, confirmation code, and new password are required.',
    })
  }

  try {
    const user = await getUserPrisma(email)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    if (user.authenticationCode !== confirmationCode) {
      return res.status(400).json({ error: 'Invalid confirmation code.' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while resetting the password.' })
  }
}
