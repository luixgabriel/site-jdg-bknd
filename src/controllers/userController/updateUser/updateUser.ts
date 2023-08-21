import { passwordValidator } from "@/middlewares/validators/passwordValidator";
import { updateUserPrisma } from "@/repositories/userRepositories/updateUser/prisma-update-user";
import { Request, Response } from "express"
import bcrypt from 'bcrypt';

export const updateUser = async (req: Request, res: Response) => {
  if(!req.user){
    return res.status(400).json({error: "Required user"})
  }
  
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }

  try {
    passwordValidator.parse(password);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const updatedUser = await updateUserPrisma(req.user, name, hashedPassword);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the user." });
  }
}