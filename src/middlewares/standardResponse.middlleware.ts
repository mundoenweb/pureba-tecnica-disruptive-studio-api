/* eslint-disable @typescript-eslint/unbound-method */
import { Request, Response, NextFunction } from 'express'

export const standardResponse = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const oldSend = res.send

  res.send = function (data: string): any {
    console.log('No content')
    const payload = JSON.parse(data)
    const response =
      payload.status >= 400 ? payload : { success: true, data: payload }

    oldSend.call(res, JSON.stringify(response))
  }

  next()
}
