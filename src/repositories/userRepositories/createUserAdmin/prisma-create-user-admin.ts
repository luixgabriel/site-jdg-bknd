import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  stack: z.array(z.string()),
  role: z.enum(["user", "admin"])
});

type userSchemaOutPut = z.infer<typeof userSchema>

export const createUserAdminPrisma = async (userData: userSchemaOutPut) => {
  try {
    const { name, email, password, stack, role } = userSchema.parse(userData);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        stack,
        role
      },
    });
    console.log(role)
    console.log(newUser)
    prisma.$disconnect();
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
