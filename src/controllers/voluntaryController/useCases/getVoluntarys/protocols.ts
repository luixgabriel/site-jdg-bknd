import { Voluntary } from '@prisma/client'

export interface IGetAllVoluntarysRepository {
  getAllVoluntarys(): Promise<Voluntary[]>
}
