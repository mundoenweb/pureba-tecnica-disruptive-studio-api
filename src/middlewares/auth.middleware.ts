import { NextFunction, Request, Response } from 'express'

import { UnauthorizedException } from '../errors/unauthorized.exception'
import { ISessionService } from '../services/session/session.service.interface'
import { RoleEntity } from '../entities/role.entity'
import { iocContainer } from '../containers/container'
import { SERVICES } from '../containers/types'
import { groupPermissions } from '../constants/dictionary.constant'

export const auth = (permissions: number[] = groupPermissions.admin) => {
  return async (
    req: Request & { userId: string; userRole: number },
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tokenBearer = req.headers.authorization
      if (!tokenBearer) throw new UnauthorizedException()

      const token = tokenBearer.split(' ')[1]

      const session = iocContainer.get<ISessionService>(SERVICES.session)
      const { rol, id } = session.validateToken(token)

      const { role } = rol as RoleEntity

      if (!permissions.includes(role)) throw new UnauthorizedException()

      req.userId = id!
      req.userRole = role!
      next()
    } catch (error) {
      next(error)
    }
  }
}
