import { passwordValidator } from "@/middlewares/validators/passwordValidator";
import { updateUserPrisma } from "@/repositories/userRepositories/updateUser/prisma-update-user";
import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { validateStack } from "@/utils/userUtils/validateStack";

interface UpdateData {
  name?: string;
  password?: string;
  stack?: string[];
}

export const updateUser = async (req: Request, res: Response) => {
  if(!req.user){
    return res.status(400).json({error: "Required user"})
  }
  
  const { name, password, stack } = req.body

  const updateData: UpdateData = {}

  if (!name && !password && !stack) {
    return res.status(400).json({ error: "At least one of name, password, or stack is required." });
  }
  
  try {
    if (password) {
      passwordValidator.parse(password);
      updateData.password = await bcrypt.hash(password, 10)
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }

  if (name !== undefined) {
    updateData.name = name;
  }

  if(stack){
    const stackValidationResult = validateStack(req.body.stack)
    if (stackValidationResult !== null) {
      return res.status(400).json({ error: stackValidationResult });
    }
    updateData.stack = stack
  }

  try {
    const updatedUser = await updateUserPrisma(req.user, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the user." });
  }
}