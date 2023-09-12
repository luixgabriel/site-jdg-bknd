import { Request, Response } from 'express';
import { createUserPrisma } from '@/repositories/userRepositories/createUser/prisma-create-user';
import { passwordValidator } from '@/middlewares/validators/passwordValidator';

export const createUser = async (req: Request, res: Response) => {
  try {
    
    try {
      passwordValidator.parse(req.body.password);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }

    if (req.body.stack.length < 1) {
      return res.status(400).json({ message: "The 'stack' field cannot be empty." });
    }

    if(req.body.stack.length > 20) {
      return res.status(400).json({ message: "The 'stack' field cannot contain more than 20 elements." })
    }

    const newUser = await createUserPrisma(req.body)

    const newUserResponse = {
        name: newUser.name,
        email: newUser.email,
        password: req.body.password,
        role: newUser.role,
        stack: newUser.stack
    };

    return res.status(201).json(newUserResponse);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
