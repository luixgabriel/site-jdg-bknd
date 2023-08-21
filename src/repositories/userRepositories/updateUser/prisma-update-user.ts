import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const updateUserPrisma = async (user: User, name: string, password: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        name: name,
        password: password,
      },
    });
    prisma.$disconnect();
    return updatedUser
  } catch (error: any) {
    prisma.$disconnect();
    throw new Error(`Error updating user: ${error.message}`);
  }
}