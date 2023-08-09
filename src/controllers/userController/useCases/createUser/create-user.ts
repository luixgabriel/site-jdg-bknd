import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreateUserParams, ICreateUserRepository } from './protocols'
import { User } from '@/models/user'
import { z } from 'zod'

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {
    createUserRepository = this.createUserRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const User = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        stack: z.array(z.string()),
        role: z.string(),
        authenticated: z.boolean().default(false),
        authenticationCode: z.number().optional(),
        authenticationCodeCreatedAt: z.date().optional(),
      })

      const user = await this.createUserRepository.createUser(
        User.parse(httpRequest.body),
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
