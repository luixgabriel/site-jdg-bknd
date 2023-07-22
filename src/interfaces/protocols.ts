export interface HttpResponse<G> {
  statusCode: number
  body: G
}
export interface HttpRequest<B> {
  params?: any
  headers?: any
  body?: B
}
export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}
