import { HttpRequest, HttpResponse, IController } from '@/interfaces/https'

export class CreateClientController implements IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
    throw new Error('Method not implemented.')
  }
}
