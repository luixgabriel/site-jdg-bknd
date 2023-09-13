import { updateAuthenticationCodePrisma } from '@/repositories/userRepositories/useCases/passwordRecovery/prisma-request-password-user'
import { generateAuthenticationCode } from '@/utils/authUtils/generateAuthenticationCode'
import { sendConfirmationEmail } from '@/utils/authUtils/sendConfirmationEmail'
import { Request, Response } from 'express'

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const confirmationCode = generateAuthenticationCode()

  try {
    await updateAuthenticationCodePrisma(email, confirmationCode)
    await sendConfirmationEmail(email, confirmationCode)
    res.status(200).json({ message: 'Confirmation code sent successfully.' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
