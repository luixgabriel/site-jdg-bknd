import prisma from '@/lib/prisma'

export const deleteUserPrisma = async (id: string) => {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id,
      },
    })
    prisma.$disconnect()
    return userDeleted
  } catch (error: any) {
    prisma.$disconnect()
    throw new Error(`Error deleting user: ${error.message}`)
  }
}
