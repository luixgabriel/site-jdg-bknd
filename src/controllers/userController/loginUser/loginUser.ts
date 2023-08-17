import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  stack: string[];
}

interface LoginResponse extends UserResponse {
  token: string;
}

interface ErrorResponse {
  error: string;
}

export const login = async (req: Request, res: Response<LoginResponse | ErrorResponse>) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const errorResponse: ErrorResponse = {
        error: 'User not found',
      };
      return res.status(401).json(errorResponse);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const errorResponse: ErrorResponse = {
        error: 'Invalid credentials',
      };
      return res.status(401).json(errorResponse);
    }

    if (!process.env.JWT_TOKEN) {
      const errorResponse: ErrorResponse = {
        error: 'JWT secret not configured',
      };
      return res.status(500).json(errorResponse);
    }

    const secret = process.env.JWT_TOKEN;

    const token = jwt.sign({ email }, secret, { expiresIn: '1d' });

    const loginResponse: LoginResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      stack: user.stack,
      token,
    };

    return res.status(200).json(loginResponse);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Error logging in',
    };
    return res.status(500).json(errorResponse);
  }
};
