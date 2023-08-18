import { Request, Response } from 'express';
import { createUserPrisma } from '@/repositories/userRepositories/createUser/createUser/prisma-create-user';

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createUserPrisma(req.body)

    const newUserResponse = {
        name: newUser.name,
        email: newUser.email,
        password: req.body.password,
        role: newUser.role
    };

    return res.status(201).json(newUserResponse);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating user' });
  }
};
