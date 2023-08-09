import {
  ICreateUserParams,
  ICreateUserRepository,
} from '@/controllers/userController/useCases/createUser/protocols'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export class PrismaCreateUserRepository implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<User> {
    const user = await prisma.user.create({
      data: params,
    })

    return user
  }
}
