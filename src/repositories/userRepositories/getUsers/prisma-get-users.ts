import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsersPrisma = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error: any) {
    throw new Error(`Error getting users: ${error.message}`);
  }
};
