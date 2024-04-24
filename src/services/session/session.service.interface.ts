import { UserEntity } from '../../entities/user.entity'
import { SessionLoginRequest } from '../../requests/session.request'

export interface ISessionService {
  login: (
    data: SessionLoginRequest,
  ) => Promise<{ user: UserEntity; token: string }>
  generateToken: (user: UserEntity) => string
  validateToken: (token: string) => UserEntity
}
