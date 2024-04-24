import { MongooseCRUD } from '../common/mongoose.repository'
import { MODELS } from '../../containers/types'
import { Model } from 'mongoose'
import { inject } from 'inversify'
import { IRolRepository } from './rol.repository.interface'
import { RoleEntity } from '../../entities/role.entity'

export class RolRepository
  extends MongooseCRUD<RoleEntity>
  implements IRolRepository
{
  constructor(@inject(MODELS.rol) rolModel: Model<RoleEntity>) {
    super({
      model: rolModel,
      entity: 'rol',
    })
  }
}
