import { Model as ModelMongoose } from 'mongoose'
import { MongoException } from './MongoException'
import { injectable } from 'inversify'

interface Params<t> {
  model: ModelMongoose<t>
  entity: string
}

@injectable()
export class MongooseCRUD<t> extends MongoException {
  protected Model: ModelMongoose<t>
  constructor({ model, entity }: Params<t>) {
    super({ entity })
    this.Model = model
  }

  async findAll(): Promise<t[]> {
    const result = await this.Model.find()
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result
  }

  async findOne(id: string): Promise<t> {
    const result = await this.Model.findById(id)
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result as unknown as t
  }

  async create(payload: Partial<t>): Promise<t> {
    const newModel = new this.Model(payload)
    const result = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))
    return result.toJSON() as unknown as t
  }

  async update(id: string, payload: Partial<t>): Promise<t> {
    const result = await this.Model.findByIdAndUpdate(
      id,
      { $set: payload as unknown as Record<string, unknown> },
      { new: true },
    )
      .exec()
      .catch((error) => this.validateError(error, 'update'))
    return result?.toJSON() as unknown as t
  }

  async delete(id: string): Promise<t> {
    const result = await this.Model.findByIdAndDelete(id)
      .exec()
      .catch((error) => this.validateError(error, 'delete'))

    return result?.toJSON() as unknown as t
  }
}
