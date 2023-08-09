import { Request, Response } from 'express'
import prisma from "@/lib/prisma";
import { generateAuthenticationCode } from "@/utils/authUtils/generateAuthenticationCode";
import { sendConfirmationEmail } from "@/utils/authUtils/sendConfirmationEmail";

export const sendAuthenticationCode = async (req: Request, res: Response) => {
  const { email } = req.body
  const authenticationCode = generateAuthenticationCode()
  const validatedEmail = email
  
  try {
    const user = await prisma.user.findUnique({where: { email: validatedEmail }});

    if(!user){
      return res.status(400).json({message: 'User does not exist!'})
    }

    if (user.authenticated) {
      return res.status(403).json({ message: 'User already authenticated' });
    }
    
    await prisma.user.update({where: { id: user.id}, data: {authenticationCode: authenticationCode, authenticationCodeCreatedAt: new Date(Date.now())}})

    await sendConfirmationEmail(user.email, authenticationCode)
    res.status(200).json({message: "authentication sent"})
  } catch (error) {
    res.status(500).json({ error: 'There was an error sending the authentication code' });
  }
}