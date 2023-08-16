import { Voluntary } from '@prisma/client'

export interface IGetVoluntaryRepository {
  getVoluntary(id: string): Promise<Voluntary>
}
