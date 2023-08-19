const nodemailer = require('nodemailer')
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gmail = process.env.GMAIL; // company gmail
const password = process.env.PASSWORD; // company gmail password

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmail,
    pass: password
  },
  debug: true
});

export async function sendConfirmationEmail(email: string, authenticationCode: number) {
  const mailOptions = {
    from: gmail,
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
