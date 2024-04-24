export abstract class BaseException extends Error {
  status: number
  code?: string
  errors?: string[]
  data?: Record<string, string>

  constructor({
    message,
    status,
    cause,
    errors,
    data,
  }: {
    message: string
    status: number
    cause?: Error
    errors?: string[]
    data?: Record<string, string>
  }) {
    super()
    this.message = message ?? 'internal server error'
    this.name = BaseException.name
    this.status = status ?? 500
    this.cause = cause
    this.data = data
    this.errors = errors
    this.stack = undefined
  }
}
