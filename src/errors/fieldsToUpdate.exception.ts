import { BaseException } from './base.exception'

export class FieldsToUpdateException extends BaseException {
  constructor() {
    super({
      message: 'Debe enviar al menos un campo para actualizar.',
      status: 400,
    })
    this.name = FieldsToUpdateException.name
  }
}
