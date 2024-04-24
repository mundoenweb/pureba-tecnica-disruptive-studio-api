import { BaseException } from './base.exception'

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super({
      message,
      status: 400,
    })
    this.name = BadRequestException.name
  }
}
