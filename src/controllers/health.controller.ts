import { fluentProvide } from 'inversify-binding-decorators'
import { Controller, Get, Route } from 'tsoa'

@fluentProvide(HealthController).done()
@Route()
export class HealthController extends Controller {
  @Get()
  async healthCheck(): Promise<Record<string, unknown>> {
    console.log('Health check is ok')
    this.setStatus(200)
    return { message: 'Server is running - rommer' }
  }
}
