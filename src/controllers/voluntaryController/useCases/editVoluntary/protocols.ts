import { Voluntary } from '@prisma/client'

export interface IEditVoluntaryParams {
  name?: string
  email?: string
  stack?: string[]
}

export interface IEditVoluntaryRepository {
  editVoluntary(id: string, params?: IEditVoluntaryParams): Promise<Voluntary>
}
