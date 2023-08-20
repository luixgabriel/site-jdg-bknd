import { NextFunction, Request, Response } from 'express'

export const validateAndTransformEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body

  // Validate the email format using a regex xxx@xx.xx
  const emailRegex =
    /^\s*([a-zA-Z0-9_.+-]{4,})@([a-zA-Z0-9-]+)\.([a-zA-Z0-9-.]{2,})\s*$/
  const emailMatch = email.match(emailRegex)

  if (!email) {
    return res
      .status(400)
      .json({ error: "The 'email' property does not exist!" })
  }

  if (!emailMatch) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  // Format the email to lowercase and remove leading/trailing whitespaces
  const formattedEmail = `${emailMatch[1]}@${emailMatch[2]}.${emailMatch[3]}`
    .toLowerCase()
    .trim()

  req.body.email = formattedEmail

  next()
}
