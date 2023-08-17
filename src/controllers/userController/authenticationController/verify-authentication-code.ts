import { Request, Response } from 'express'
import prisma from '@/lib/prisma'
import { isWithinTimeLimit } from '@/utils/authUtils/isWithinTimeLimit'

export const verifyAuthenticationCode = async (req: Request, res: Response) => {
  const { authenticationCode, email } = req.body
  const validatedEmail = email

  try {
    const user = await prisma.user.findUnique({
      where: { email: validatedEmail },
    })

    if (!user) {
      return res.status(400).json({ message: 'User does not exist!' })
    }

    if (user.authenticated) {
      return res.status(403).json({ message: 'User already authenticated' })
    }

    if(!user.authenticationCodeCreatedAt){
      return res.status(400).json({ message: 'Authentication code does not exist!'})
    }

    if(!isWithinTimeLimit(user.authenticationCodeCreatedAt, 5)){
      return res.status(400).json({ message: 'Authentication code expired'})
    }

    if (authenticationCode === user.authenticationCode) {
      await prisma.user.update({
        where: { id: user.id },
        data: { authenticated: true },
      })
      return res.status(200).json({ message: 'Authentication code is correct' })
    } else {
      return res.status(400).json({ error: 'Invalid authentication code' })
    }
  } catch (error) {
    return res.status(500).json({
      error: 'An error occurred while verifying the authentication code',
    })
  }
}
