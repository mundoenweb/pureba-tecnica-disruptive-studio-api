import { BaseException } from './base.exception'

export interface ValidationExceptionInterface {
  payload?: string
  type?: string
}

export class ValidationException extends BaseException {
  readonly options?: ValidationExceptionInterface

  constructor(errors: string[]) {
    super({
      message: 'Validation error',
      status: 400,
      errors,
    })
    this.name = ValidationException.name
  }
}
