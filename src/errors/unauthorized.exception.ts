import { BaseException } from './base.exception'

export class UnauthorizedException extends BaseException {
  constructor() {
    super({
      message: 'Usuario no autorizado',
      status: 401,
    })
    this.name = UnauthorizedException.name
  }
}
