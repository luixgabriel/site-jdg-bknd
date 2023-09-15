import { Request, Response } from 'express'
import { findUser } from '@/repositories/userRepositories/loginUser/prisma-login-user'
import bcrypt from 'bcrypt'
import { generateToken } from '@/utils/authUtils/generateAuthenticationToken'

interface LoginResponse {
  id: string
  name: string
  email: string
  role: string
  stack: string[]
  token: string
}

interface ErrorResponse {
  error: string
}

export const login = async (
  req: Request,
  res: Response<LoginResponse | ErrorResponse>,
) => {
  const { email, password } = req.body

  try {
    const userResponse = await findUser(email)

    if (!userResponse) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, userResponse.password)

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(email)

    return res.status(200).json({
      id: userResponse.id,
      name: userResponse.name,
      email: userResponse.email,
      role: userResponse.role,
      stack: userResponse.stack,
      token,
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
