import { UserEntity } from '../../entities/user.entity'
import { MongooseCRUD } from '../common/mongoose.repository'
import { IUserRepository } from './user.repository.interface'
import { MODELS } from '../../containers/types'
import { Model } from 'mongoose'
import { inject } from 'inversify'

export class UserRepository
  extends MongooseCRUD<UserEntity>
  implements IUserRepository
{
  constructor(@inject(MODELS.user) userModel: Model<UserEntity>) {
    super({
      model: userModel,
      entity: 'usuario',
    })
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.Model.findById(id)
      .populate('rol', '-_id')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return user as unknown as UserEntity
  }

  async findAll(filter: Partial<UserEntity> = {}): Promise<UserEntity[]> {
    const user = await this.Model.find(filter)
      .populate('rol', '-_id')
      .exec()
      .catch((error) => this.validateError(error, 'find'))

    return user as unknown as UserEntity[]
  }

  async create(payload: Partial<UserEntity>): Promise<UserEntity> {
    const newModel = new this.Model(payload)
    const user = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))

    const result = await user
      .populate('rol', '-_id')
      .catch((error) => this.validateError(error, 'create'))
    return result.toJSON() as unknown as UserEntity
  }
}
