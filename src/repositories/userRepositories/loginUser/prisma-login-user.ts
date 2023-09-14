import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const findUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    prisma.$disconnect()
    return user
  } catch (error: any) {
    prisma.$disconnect()
    throw new Error(error.message)
  }
}
