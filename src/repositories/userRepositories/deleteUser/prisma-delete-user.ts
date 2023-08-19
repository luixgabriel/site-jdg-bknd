import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const deleteUserPrisma = async (user: User) => {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return userDeleted
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}