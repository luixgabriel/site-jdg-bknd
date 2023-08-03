const nodemailer = require('nodemailer')
import dotenv from 'dotenv';
dotenv.config();

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
    console.log('E-mail enviado:', info.response);
  } catch (error: any) {
    console.error('Erro ao enviar e-mail:', error.message);
  }
}
