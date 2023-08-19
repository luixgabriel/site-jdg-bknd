import { getUsersPrisma } from "@/repositories/userRepositories/getUsers/prisma-get-users";
import { Request, Response } from "express"

export const getUsers = async (req: Request, res: Response) => {
  if(!req.user){
    return res.status(400).json({error: "Required user"})
  }

  if(req.user.role !== "admin") {
    return res.status(403).json({error: "Required user admin"})
  }

  try {
    const users = await getUsersPrisma();
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}