import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreateVoluntaryParams, ICreateVoluntaryRepository } from './protocols'
import { z } from 'zod'
import { Voluntary } from '@prisma/client'

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

      const user = await this.createVoluntaryRepository.createVoluntary(
        Voluntary.parse(httpRequest.body),
      )
      return {
        statusCode: 200,
        body: user,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 400,
        body: error,
      }
    }
  }
}
