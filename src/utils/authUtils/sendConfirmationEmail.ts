import { PrismaClient } from '@prisma/client';
import { transporter } from './transporterEmail';

const prisma = new PrismaClient();

export async function sendConfirmationEmail(email: string, authenticationCode: number) {
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: 'Confirmação de E-mail',
    text: `Seu código de autenticação é: ${authenticationCode}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const user = await prisma.user.findUnique({where: {email: email}})
    if (!user) {
      throw new Error('Email does not exist');
    }
    console.log('Email sent:', info.response);
  } catch (error: any) {
    throw new Error(error.message)
  }
}
