import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (email: string): string => {
  if (!process.env.JWT_TOKEN) {
    throw new Error('JWT secret not configured')
  }

  const secret = process.env.JWT_TOKEN
  return jwt.sign({ email }, secret, { expiresIn: '1d' })
}
