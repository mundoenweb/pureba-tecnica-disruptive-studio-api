import { BaseException } from './base.exception'

export class RolException extends BaseException {
  constructor() {
    super({
      message: 'Rol invalido',
      status: 403,
    })
    this.name = RolException.name
  }
}
