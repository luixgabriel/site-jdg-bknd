import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export const updateUserPrisma = async (
  user: User,
  updateData: Partial<User>,
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: updateData,
    })
    prisma.$disconnect()
    return updatedUser
  } catch (error: any) {
    prisma.$disconnect()
    throw new Error(`Error updating user: ${error.message}`)
  }
}
