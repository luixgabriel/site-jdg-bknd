import { HttpResponse, IController } from '@/interfaces/https'
import { Voluntary } from '@prisma/client'
import { IGetAllVoluntarysRepository } from './protocols'

export class GetAllVoluntarysController implements IController {
  constructor(
    private readonly getAllVoluntarysRepository: IGetAllVoluntarysRepository,
  ) {
    this.getAllVoluntarysRepository = getAllVoluntarysRepository
  }

  async handle(): Promise<HttpResponse<Voluntary[]>> {
    try {
      const voluntarys =
        await this.getAllVoluntarysRepository.getAllVoluntarys()
      return {
        statusCode: 200,
        body: voluntarys,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          msg: 'Internal server error.',
        },
      }
    }
  }
}
