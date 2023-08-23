import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'
require('dotenv').config()

const prisma = new PrismaClient()

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const withAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: no token provided' })
    }

    if (!process.env.JWT_TOKEN) {
      return res.status(401).json({ error: 'JWT secret not configured' })
    }
    const secret = process.env.JWT_TOKEN

    const decodedToken = jwt.verify(token, secret) as JwtPayload

    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized: token invalid' })
    }

    const user = await prisma.user.findUnique({
      where: { email: decodedToken.email },
    })

    if (!user) {
      return res.status(404).json({ error: 'User dont match' })
    }

    req.user = user
    prisma.$disconnect()
    next()
  } catch (error) {
    prisma.$disconnect()
    console.error('Error in withAuth middleware:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
