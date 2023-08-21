import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['user', 'admin']),
})

type userSchemaOutPut = z.infer<typeof userSchema>

export const createUserPrisma = async (userData: userSchemaOutPut) => {
  try {
    const { name, email, password, role } = userSchema.parse(userData)

    if (role === 'admin') {
      throw new Error('Unauthorized to create an admin')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    prisma.$disconnect()
    return newUser
  } catch (error: any) {
    throw new Error(error.message)
  }
}
