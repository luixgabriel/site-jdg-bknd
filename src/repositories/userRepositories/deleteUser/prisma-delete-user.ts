import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const deleteUserPrisma = async (user: User) => {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    prisma.$disconnect();
    return userDeleted
  } catch (error: any) {
    prisma.$disconnect();
    throw new Error(`Error deleting user: ${error.message}`);
  }
}