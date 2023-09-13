import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Client } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'
import { IDeleteClientRepository } from './protocols'

export class DeleteClientController implements IController {
  constructor(
    private readonly deleteClientRepository: IDeleteClientRepository,
  ) {
    deleteClientRepository = this.deleteClientRepository
  }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Client>> {
    try {
      const deletedClient = await this.deleteClientRepository.deleteClient(
        httpRequest.params.id,
      )
      return ok(deletedClient)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
