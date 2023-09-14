import { z } from 'zod'

const jobOpportunitySchema = z.object({
  title: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  status: z.string().optional(),
})

export default jobOpportunitySchema
