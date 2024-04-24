import { BaseException } from './base.exception'

export class InternalServerException extends BaseException {
  constructor(message: string = 'Internal Server Error') {
    super({
      message,
      status: 500,
    })
    this.name = InternalServerException.name
  }
}
