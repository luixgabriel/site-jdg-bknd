import { HttpResponse, IController } from '@/interfaces/https'
import { Client, Post } from '@prisma/client'
import { IGetAllClientsRepository } from './protocols'
import { ok, serverError } from '@/helpers/http-helpers'

export class GetAllClientsController implements IController {
  constructor(
    private readonly getAllClientsRepository: IGetAllClientsRepository,
  ) {
    this.getAllClientsRepository = getAllClientsRepository
  }

  async handle(): Promise<HttpResponse<Client[] | any>> {
    try {
      const Clients = await this.getAllClientsRepository.getAllClients()
      return ok(Clients)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
