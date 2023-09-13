import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { ICreateClientParams, ICreateClientRepository } from './protocols'
import { Client } from '@prisma/client'
import { z } from 'zod'
import { ok, serverError } from '@/helpers/http-helpers'
import generateImage from '@/utils/generateImage'

export class CreateClientController implements IController {
  constructor(
    private readonly createClientRepository: ICreateClientRepository,
  ) {
    createClientRepository = this.createClientRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateClientParams>,
  ): Promise<HttpResponse<Client | string>> {
    let body = httpRequest.body
    if (httpRequest.file)
      body = generateImage(httpRequest.file.filename, httpRequest.body)
    try {
      const client = await this.createClientRepository.createClient(body)
      return ok(client)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
