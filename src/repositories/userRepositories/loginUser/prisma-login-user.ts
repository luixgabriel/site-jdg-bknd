import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { generateToken } from '@/utils/authUtils/generateAuthenticationToken'

const prisma = new PrismaClient()

export const authenticateUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid credentials')
    }

    const token = generateToken(email)

    prisma.$disconnect()
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      stack: user.stack,
      token,
    }
  } catch (error: any) {
    prisma.$disconnect()
    throw new Error(error.message)
  }
}
