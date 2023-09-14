import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreateVoluntaryParams, ICreateVoluntaryRepository } from './protocols'
import { ZodError } from 'zod'
import { Voluntary } from '@prisma/client'
import { badRequest, ok, serverError } from '@/helpers/http-helpers'
import voluntarySchema from '@/schemas/voluntary'

export class CreateVoluntaryController implements IController {
  constructor(
    private readonly createVoluntaryRepository: ICreateVoluntaryRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<ICreateVoluntaryParams>,
  ): Promise<HttpResponse<Voluntary | string>> {
    let parsedBody
    try {
      parsedBody = voluntarySchema.parse(httpRequest.body)
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log(error.errors)
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
      const voluntary = await this.createVoluntaryRepository.createVoluntary(
        parsedBody,
      )
      return ok(voluntary)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
