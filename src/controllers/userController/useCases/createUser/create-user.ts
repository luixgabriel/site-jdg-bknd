import { IController, HttpRequest, HttpResponse } from '@/interfaces/protocols'

export class createUserController implements IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
    throw new Error('Method not implemented.')
  }
}
