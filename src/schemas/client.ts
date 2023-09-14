import { z } from 'zod'

const clientSchema = z.object({
  name: z.string(),
  email: z.string().email().trim().toLowerCase(),
  image: z.string(),
})

export default clientSchema
