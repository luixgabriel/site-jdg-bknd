import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'
import { ICreateClientParams, ICreateClientRepository } from './protocols'
import { Client } from '@prisma/client'
import { ZodError } from 'zod'
import { badRequest, ok, serverError } from '@/helpers/http-helpers'
import generateImage from '@/utils/generateImage'
import clientSchema from '@/schemas/client'

export class CreateClientController implements IController {
  constructor(
    private readonly createClientRepository: ICreateClientRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<ICreateClientParams>,
  ): Promise<HttpResponse<Client | string>> {
    let body = httpRequest.body
    if (httpRequest.file)
      body = generateImage(httpRequest.file.filename, httpRequest.body)

    let parsedBody
    try {
      parsedBody = clientSchema.parse(body)
    } catch (error: any) {
      if (error instanceof ZodError) {
        const missingFields = error.errors
          .map((err) => err.path[0])
          .filter(Boolean)
          .join(', ')
        return badRequest({
          message: `Missing or invalid field(s): ${missingFields}`,
        })
      }
      return serverError(error)
    }
    try {
      const client = await this.createClientRepository.createClient(parsedBody)
      return ok(client)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
