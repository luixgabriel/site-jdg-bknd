import { updateUserPrisma } from "@/repositories/userRepositories/updateUser/prisma-update-user";
import { Request, Response } from "express"
import { validateStack } from "@/utils/userUtils/validateStack";
import { getUserPrisma } from "@/repositories/userRepositories/getUser/prisma-get-user";

interface UpdateData {
  name?: string
  stack?: string[]
}

export const updateUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(400).json({ error: 'Required user' })
  }

  const { name, stack } = req.body
  const { id } = req.params

  const updateData: UpdateData = {}

  if (!name && !stack) {
    return res.status(400).json({ error: 'At least one of name or stack is required.' })
  }

  if (name !== undefined) {
    updateData.name = name
  }

  if (stack) {
    const stackValidationResult = validateStack(req.body.stack)
    if (stackValidationResult !== null) {
      return res.status(400).json({ error: stackValidationResult })
    }
    updateData.stack = stack
  }

  const user = await getUserPrisma(id);

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  try {
    const updatedUser = await updateUserPrisma(user, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the user.' })
  }
}
