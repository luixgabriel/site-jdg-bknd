const nodemailer = require('nodemailer')  

require('dotenv').config()
const gmail = process.env.GMAIL // company gmail
const password = process.env.PASSWORD // company gmail password


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmail,
    pass: password
  },
  debug: true
})