import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserPrisma = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({where: {id}})
    prisma.$disconnect();
    return user
  } catch (error: any) {
    prisma.$disconnect();
    throw new Error(error.message)
  }
};