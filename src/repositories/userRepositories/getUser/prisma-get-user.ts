import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserPrisma = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({where: {email: email}})
    prisma.$disconnect();
    return user
  } catch (error: any) {
    prisma.$disconnect();
    throw new Error(error.message)
  }
};