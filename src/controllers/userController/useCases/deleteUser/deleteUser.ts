import { deleteUserPrisma } from "@/repositories/userRepositories/deleteUser/prisma-delete-user";
import { Request, Response } from "express"

export const deleteUser = async (req: Request, res: Response) => {
  if(!req.user){
    return res.status(400).json({error: "Required user"})
  }

  const { id } = req.params

  try {
    const userDeleted = await deleteUserPrisma(id);
    res.status(200).json(`User deleted: ${userDeleted}`)
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the user." });
  }
}