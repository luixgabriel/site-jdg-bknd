import { IController, HttpRequest, HttpResponse } from '@/interfaces/https'
import { ICreateUserParams, ICreateUserRepository } from './protocols'
import { User } from '@/models/user'

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {
    createUserRepository = this.createUserRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const user = await this.createUserRepository.createUser(httpRequest.body)
      return {
        statusCode: 200,
        body: user,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 400,
        body: 'Error',
      }
    }
  }
}
