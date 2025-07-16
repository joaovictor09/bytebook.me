export class ForbiddenError extends Error {
  constructor(message = 'Operation not allowed') {
    super(message)
    this.name = 'ForbiddenError'
  }
}
