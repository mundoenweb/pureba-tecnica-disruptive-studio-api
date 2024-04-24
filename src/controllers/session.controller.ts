import { fluentProvide } from 'inversify-binding-decorators'
import { Body, Controller, Middlewares, Post, Route } from 'tsoa'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'
import { inject } from 'inversify'
import { SERVICES } from '../containers/types'
import { UserEntity } from '../entities/user.entity'
import { ISessionService } from '../services/session/session.service.interface'
import { SessionLoginRequest } from '../requests/session.request'

@fluentProvide(SessionController).done()
@Route('session')
export class SessionController extends Controller {
  constructor(
    @inject(SERVICES.session)
    private readonly sessionService: ISessionService,
  ) {
    super()
  }

  @Middlewares(validateClassValidator('body', SessionLoginRequest))
  @Post('login')
  async create(
    @Body() body: SessionLoginRequest,
  ): Promise<{ token: string; user: UserEntity }> {
    const user = await this.sessionService.login(body)
    return user
  }
}
