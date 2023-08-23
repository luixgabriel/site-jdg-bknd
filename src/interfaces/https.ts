export interface HttpResponse<G = any> {
  statusCode: number
  body: G
}
export interface HttpRequest<B = any> {
  params?: any
  headers?: any
  body?: B
  file?: any
  query?: any
}
export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}
