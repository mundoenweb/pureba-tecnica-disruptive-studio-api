import jwt from 'jsonwebtoken'
import { inject, injectable } from 'inversify'
import { UserEntity } from '../../entities/user.entity'
import { ISessionService } from './session.service.interface'
import { environment } from '../../constants/dictionary.constant'
import { SERVICES } from '../../containers/types'
import { IUserService } from '../user/user.service.interface'
import { SessionLoginRequest } from '../../requests/session.request'
import { InvalidCredentialsException } from '../../errors/invalidCredentials.exception'
import { Document } from 'mongoose'
import { UnauthorizedException } from '../../errors/unauthorized.exception'

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject(SERVICES.user)
    private readonly userService: IUserService,
  ) {}

  generateToken(user: UserEntity): string {
    return jwt.sign({ ...user }, environment.secretJWT, {
      expiresIn: environment.jwtExpiresIn,
    })
  }

  async login(
    data: SessionLoginRequest,
  ): Promise<{ user: UserEntity; token: string }> {
    const users = await this.userService.findAll(data)
    if (!users.length) throw new InvalidCredentialsException()

    const user = (
      users[0] as unknown as Document<UserEntity>
    ).toJSON() as UserEntity

    const token = this.generateToken(user)

    return { user, token }
  }

  validateToken(token: string): UserEntity {
    try {
      const { exp, iat, ...user } = jwt.verify(
        token,
        environment.secretJWT,
      ) as jwt.JwtPayload & UserEntity

      return user
    } catch {
      throw new UnauthorizedException()
    }
  }
}
