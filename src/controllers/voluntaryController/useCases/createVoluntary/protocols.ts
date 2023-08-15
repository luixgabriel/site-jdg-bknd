import { Voluntary } from '@prisma/client'

export interface ICreateVoluntaryParams {
  name: string
  email: string
  stack: string[]
}

export interface ICreateVoluntaryRepository {
  createVoluntary(params?: ICreateVoluntaryParams): Promise<Voluntary>
}
