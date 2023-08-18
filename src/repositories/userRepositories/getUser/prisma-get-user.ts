import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserPrisma = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({where: {email: email}})
    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
};