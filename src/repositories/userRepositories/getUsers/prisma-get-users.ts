import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsersPrisma = async () => {
  try {
    const users = await prisma.user.findMany();
    prisma.$disconnect();
    return users
  } catch (error: any) {
    prisma.$disconnect();
    throw new Error(`Error getting users: ${error.message}`);
  }
};
