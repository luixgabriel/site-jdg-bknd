import { Request, Response } from 'express';
import { createUserPrisma } from '@/repositories/userRepositories/createUser/prisma-create-user';
import { passwordValidator } from '@/middlewares/validators/passwordValidator';
import { validateStack } from '@/utils/userUtils/validateStack';
import { createUserAdminPrisma } from '@/repositories/userRepositories/createUserAdmin/prisma-create-user-admin';

export const createUserAdmin = async (req: Request, res: Response) => {
  if(!req.user){
    return res.status(400).json({error: "Required user"})
  }

  if(req.user.role !== "admin") {
    return res.status(403).json({error: "Required user admin"})
  }
  try {
    
    try {
      passwordValidator.parse(req.body.password);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }

    if(!req.body.stack){
      return res.status(400).json({error: "stack with at least 1 field is required"})
    }

    const stackValidationResult = validateStack(req.body.stack)
    if (stackValidationResult !== null) {
      return res.status(400).json({ error: stackValidationResult });
    }

    const newUser = await createUserAdminPrisma(req.body)

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
