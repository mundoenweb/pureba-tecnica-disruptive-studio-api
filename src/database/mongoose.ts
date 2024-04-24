import { injectable } from 'inversify'
import mongoose from 'mongoose'
import { environment } from '../constants/dictionary.constant'

@injectable()
export class MongooseDB {
  async connect(): Promise<void> {
    await mongoose
      .connect(environment.database.host, {
        dbName: environment.database.dbName,
        user: environment.database.user,
        pass: environment.database.pass,
        retryWrites: true,
        w: 'majority',
      })
      .then((d) => {
        console.log('Database connected:', d.connection.name)
      })
      .catch((err) => {
        console.log('Error connecting to database:', err.message)
      })
  }
}
