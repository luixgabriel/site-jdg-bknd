import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { Client } from '@prisma/client'
import { NotFoundError } from '@/errors/not-found-error'
import { IGetClientRepository } from './protocols'
import { notFound, ok, serverError } from '@/helpers/http-helpers'

export class GetClientController implements IController {
  constructor(private readonly getClientRepository: IGetClientRepository) {
    getClientRepository = this.getClientRepository
  }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Client>> {
    try {
      const clientExists = await this.getClientRepository.exists(
        httpRequest.params.id,
      )
      if (!clientExists) {
        return notFound(new NotFoundError('Client not Found.'))
      }
      const client = await this.getClientRepository.getClient(
        httpRequest.params.id,
      )
      return ok(client)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
