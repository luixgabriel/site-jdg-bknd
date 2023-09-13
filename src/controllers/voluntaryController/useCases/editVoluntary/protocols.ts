import { Voluntary } from '@prisma/client'

export interface IEditVoluntaryParams {
  name?: string
  email?: string
  stack?: string[]
}

export interface IEditVoluntaryRepository {
  exists(id: string): Promise<boolean>
  editVoluntary(id: string, params?: IEditVoluntaryParams): Promise<Voluntary>
}
