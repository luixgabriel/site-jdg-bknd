import { Voluntary } from '@prisma/client'

export interface IGetVoluntaryRepository {
  exists(id: string): Promise<boolean>
  getVoluntary(id: string): Promise<Voluntary>
}
