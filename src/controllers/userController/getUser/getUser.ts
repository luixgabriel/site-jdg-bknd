import { getUserPrisma } from "@/repositories/userRepositories/getUser/prisma-get-user"
import { Request, Response } from "express"

export const getUser = (req: Request, res: Response) => {
  if(req.body.user.role !== "admin") {
    return res.status(403).json({error: "Required user admin"})
  }

  const { email } = req.body.email

  try {
    const user = getUserPrisma(email)
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}