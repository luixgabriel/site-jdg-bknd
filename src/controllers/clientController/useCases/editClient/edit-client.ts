import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import generateImage from '@/utils/generateImage'
import { notFound, ok, serverError } from '@/helpers/http-helpers'
import { NotFoundError } from '@/errors/not-found-error'
import { IEditClientParams, IEditClientRepository } from './protocols'
import { Client } from '@prisma/client'

export class EditClientController implements IController {
  constructor(private readonly editClientRepository: IEditClientRepository) {
    editClientRepository = this.editClientRepository
  }

  async handle(
    httpRequest: HttpRequest<IEditClientParams>,
  ): Promise<HttpResponse<Client | string>> {
    let body = httpRequest.body
    const id = httpRequest.params.id
    if (httpRequest.file)
      body = await generateImage(httpRequest.file.path, httpRequest.body)
    try {
      const clientExists = await this.editClientRepository.exists(id)

      if (!clientExists) {
        return notFound(new NotFoundError('Client not Found.'))
      }
      const updatedClient = await this.editClientRepository.editClient(
        id,
        body as IEditClientParams,
      )
      return ok(updatedClient)
    } catch (error: any) {
      return serverError(error.stack)
    }
  }
}
