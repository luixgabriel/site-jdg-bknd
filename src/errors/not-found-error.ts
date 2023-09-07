export class NotFoundError extends Error {
  constructor(paramName: string | undefined) {
    super(`Not Found: ${paramName}`)
    this.name = `${paramName}`
  }
}
