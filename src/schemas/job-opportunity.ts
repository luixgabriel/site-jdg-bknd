import { z } from 'zod'

const jobOpportunitySchema = z.object({
  title: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  category: z.string(),
  status: z.string().optional(),
  endDate: z.date(),
})

export default jobOpportunitySchema
