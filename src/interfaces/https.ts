export interface HttpResponse<G> {
  statusCode: number
  body: any
}
export interface HttpRequest<B> {
  params?: any
  headers?: any
  body?: B
}
export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}
