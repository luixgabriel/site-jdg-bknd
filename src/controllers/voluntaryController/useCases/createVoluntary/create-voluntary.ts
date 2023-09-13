import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreateVoluntaryParams, ICreateVoluntaryRepository } from './protocols'
import { z } from 'zod'
import { Voluntary } from '@prisma/client'
import { ok, serverError } from '@/helpers/http-helpers'

export class CreateVoluntaryController implements IController {
  constructor(
    private readonly createVoluntaryRepository: ICreateVoluntaryRepository,
  ) {
    createVoluntaryRepository = this.createVoluntaryRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateVoluntaryParams>,
  ): Promise<HttpResponse<Voluntary | string>> {
    try {
      const Voluntary = z.object({
        name: z.string(),
        email: z.string().email().trim().toLowerCase(),
        stack: z.array(z.string()),
      })

      const voluntary = await this.createVoluntaryRepository.createVoluntary(
        Voluntary.parse(httpRequest.body),
      )
      return ok(voluntary)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
