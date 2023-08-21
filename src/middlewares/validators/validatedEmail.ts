import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const emailSchema = z
  .string()
  .email('Invalid email format')
  .transform((email) => email.trim().toLowerCase())

export const validateAndTransformEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body

  try {
    const formattedEmail = emailSchema.parse(email)
    req.body.email = formattedEmail

    next()
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
