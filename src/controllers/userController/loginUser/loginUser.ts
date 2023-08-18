import { Request, Response } from 'express';
import { authenticateUser } from '@/repositories/userRepositories/loginUser/prisma-login-user';

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  stack: string[];
  token: string;
}

interface ErrorResponse {
  error: string;
}

export const login = async (req: Request, res: Response<LoginResponse | ErrorResponse>) => {
  const {email, password} = req.body
  try {

    const userResponse = await authenticateUser(email, password)

    return res.status(200).json(userResponse);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Error logging in',
    };
    return res.status(500).json(errorResponse);
  }
};
