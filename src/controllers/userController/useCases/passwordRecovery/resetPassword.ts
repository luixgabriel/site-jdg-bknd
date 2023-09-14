import { passwordValidator } from "@/middlewares/validators/passwordValidator";
import { getUserPrisma } from "@/repositories/userRepositories/getUser/prisma-get-user";
import { updatePasswordUserPrisma } from "@/repositories/userRepositories/useCases/passwordRecovery/prisma-update-password";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { isWithinTimeLimit } from "@/utils/authUtils/isWithinTimeLimit";

export const resetPassword = async (req: Request, res: Response) => {
  const { email, confirmationCode, newPassword } = req.body;

  if (!email || !confirmationCode || !newPassword) {
    return res.status(400).json({ error: "Email, confirmation code, and new password are required." });
  }

  try {
    const user = await getUserPrisma(email)

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.authenticationCode != confirmationCode) {
      return res.status(400).json({ error: "Invalid confirmation code." });
    }
    if(!user.authenticationCodeCreatedAt){
      return res.status(500).json({error: "invalid authentication code creation date"})
    }

    if (!isWithinTimeLimit(user.authenticationCodeCreatedAt, 5)) {
      return res.status(400).json({ error: "Confirmation code has expired." });
    }

    try {
      passwordValidator.parse(newPassword);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await updatePasswordUserPrisma(user, hashedPassword);

    res.status(200).json({updatedUser, message: "Password reset successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while resetting the password." });
  }
};