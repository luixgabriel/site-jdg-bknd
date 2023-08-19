import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateAuthenticationCodePrisma = async (email: string, authenticationCode: number) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        authenticationCode,
        authenticationCodeCreatedAt: new Date(Date.now())
      },
    });

    return updatedUser
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}