import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { ICreateClientParams, ICreateClientRepository } from './protocols'
import { Client } from '@prisma/client'
import { z } from 'zod'
import { ok, serverError } from '@/helpers/http-helpers'

export class CreateClientController implements IController {
  constructor(
    private readonly createClientRepository: ICreateClientRepository,
  ) {
    createClientRepository = this.createClientRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateClientParams>,
  ): Promise<HttpResponse<Client | string>> {
    try {
      const Client = z.object({
        name: z.string(),
        email: z.string(),
        logo: z.string(),
      })

      const client = await this.createClientRepository.createClient(
        Client.parse(httpRequest.body),
      )
      return ok(client)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
