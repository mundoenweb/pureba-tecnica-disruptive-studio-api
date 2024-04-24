import { inject, injectable } from 'inversify'
import { ValidationService } from 'tsoa'
import { RegisterRoutes } from './routes'
import express, {
  NextFunction,
  Request,
  Response,
  type Application,
} from 'express'

import cors from 'cors'
import { MongooseDB } from './database/mongoose'
import { APP } from './containers/types'
import { standardResponse } from './middlewares/standardResponse.middlleware'

@injectable()
export class App {
  private readonly app: Application

  constructor(@inject(APP.mongoose) private readonly mongoose: MongooseDB) {
    this.app = express()
    void this.init()
  }

  async init(): Promise<void> {
    await this.mongoose.connect()
  }

  get(): Application {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.disable('x-powered-by')

    // ---- Deshabilita la validación de TSOA ----
    ValidationService.prototype.ValidateParam = (
      _property,
      rawValue,
      _name = '',
      _fieldErrors,
      _parent = '' as any,
      _minimalSwaggerConfig,
    ) => rawValue

    RegisterRoutes.prototype.getValidatedArgs = (args: {}) => Object.keys(args)
    // --- Fin de la deshabilitación de la validación de TSOA ---

    this.app.use(standardResponse)

    RegisterRoutes(this.app)

    this.app.use((_req, _res, next) => {
      next({ status: 404, message: 'Path Not Fount' })
    })

    this.app.use(
      (err: any, _req: Request, res: Response, _next: NextFunction) => {
        res.status((err.status as number) ?? 500)
        res.json(err)
      },
    )

    return this.app
  }
}
