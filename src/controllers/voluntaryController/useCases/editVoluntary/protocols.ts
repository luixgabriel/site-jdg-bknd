import { Voluntary } from '@prisma/client'

export type IEditVoluntaryParams = Partial<Voluntary>

export interface IEditVoluntaryRepository {
  exists(id: string): Promise<boolean>
  editVoluntary(id: string, params?: IEditVoluntaryParams): Promise<Voluntary>
}
