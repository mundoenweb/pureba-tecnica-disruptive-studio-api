import { fluentProvide } from 'inversify-binding-decorators'
import { Body, Controller, Get, Middlewares, Post, Request, Route } from 'tsoa'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'
import { UserRequest } from '../requests/user.request'
import { inject } from 'inversify'
import { SERVICES } from '../containers/types'
import { IUserService } from '../services/user/user.service.interface'
import { UserEntity } from '../entities/user.entity'
import { ISessionService } from '../services/session/session.service.interface'
import { auth } from '../middlewares/auth.middleware'
import { groupPermissions, userRoles } from '../constants/dictionary.constant'
import { Request as Req } from 'express'
import { UnauthorizedException } from '../errors/unauthorized.exception'

@fluentProvide(UsersController).done()
@Route('users')
export class UsersController extends Controller {
  constructor(
    @inject(SERVICES.user)
    private readonly userService: IUserService,
    @inject(SERVICES.session)
    private readonly sessionService: ISessionService,
  ) {
    super()
  }

  @Middlewares(validateClassValidator('body', UserRequest))
  @Post()
  async create(
    @Body() body: UserRequest,
  ): Promise<{ token: string; user: UserEntity }> {
    const user = await this.userService.create(body)
    const token = this.sessionService.generateToken(user)
    return { user, token }
  }

  @Middlewares(auth())
  @Get()
  async findAll(): Promise<UserEntity[]> {
    const user = await this.userService.findAll()
    return user
  }

  @Middlewares(auth(groupPermissions.all))
  @Get('/{id}')
  async findOne(id: string, @Request() req: Req): Promise<UserEntity | null> {
    const { userId, userRole } = req as unknown as {
      userId: string
      userRole: number
    }
    if (userId !== id && userRoles.admin !== userRole) {
      throw new UnauthorizedException()
    }

    const user = await this.userService.findOne(id)
    return user
  }
}
