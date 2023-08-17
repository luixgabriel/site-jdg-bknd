import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const validRoles = ['user', 'admin'];
  try {

    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid user role' });
    }
    
    if (role === 'admin') {
      return res.status(401).json({ error: 'Unauthorized to create an admin' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
};
