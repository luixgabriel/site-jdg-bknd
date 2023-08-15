import { Voluntary } from '@prisma/client'

export interface IDeleteVoluntaryRepository {
  deleteVoluntary(id: string): Promise<Voluntary>
}
