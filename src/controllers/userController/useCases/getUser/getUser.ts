import { getUserPrisma } from "@/repositories/userRepositories/getUser/prisma-get-user"
import { Request, Response } from "express"

export const getUser = async (req: Request, res: Response) => {
  if(!req.user){
    return res.status(400).json({error: "Required user"})
  }

  if(req.user.role !== "admin") {
    return res.status(403).json({error: "Required user admin"})
  }

  const { id } = req.params

  try {
    const user = await getUserPrisma(id)
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}