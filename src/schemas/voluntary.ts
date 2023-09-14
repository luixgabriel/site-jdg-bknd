import { z } from 'zod'

const voluntarySchema = z.object({
  name: z.string(),
  email: z.string().email().trim().toLowerCase(),
  stack: z.array(z.string()),
})

export default voluntarySchema
