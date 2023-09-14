import { z } from 'zod'

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  authorId: z.string(),
})

export default postSchema
