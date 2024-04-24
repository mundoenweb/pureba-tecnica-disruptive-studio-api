import { BaseException } from './base.exception'

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super({
      message: 'Usuario o email invalida',
      status: 400,
    })
    this.name = InvalidCredentialsException.name
  }
}
