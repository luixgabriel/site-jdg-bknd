import { Client } from '@prisma/client'
import { ICreateClientParams } from '../createClient/protocols'

export type IEditClientParams = Partial<ICreateClientParams>

export interface IEditClientRepository {
  exists(id: string): Promise<boolean>
  editClient: (id: string, params: IEditClientParams) => Promise<Client>
}
