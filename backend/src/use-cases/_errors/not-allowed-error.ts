export class NotAllowedError extends Error {
  constructor() {
    super('Not allowed error.')
    this.name = 'NotAllowedError' // Corrige o name para facilitar o catch no controller
  }
}
