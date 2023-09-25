import { NotFoundError } from '@/errors/not-found-error'
import { ServerError } from '@/errors/server-error'
import { HttpResponse } from '@/interfaces/https'

export const badRequest = (error: any): HttpResponse<any> => ({
  statusCode: 400,
  body: {
    message: error,
  },
})

export const forbidden = (error: Error): HttpResponse<any> => ({
  statusCode: 403,
  body: error,
})

// export const unauthorized = (): HttpResponse<any> => ({
//   statusCode: 401,
//   body: new UnauthorizedError(),
// })

export const notFound = (error: Error): HttpResponse<any> => ({
  statusCode: 404,
  body: new NotFoundError(error.name),
})

export const serverError = (error: Error): HttpResponse<any> => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const ok = (data: any): HttpResponse<any> => ({
  statusCode: 200,
  body: data,
})

// export const noContent = (): HttpResponse => ({
//   statusCode: 204,
//   body: null,
// })
