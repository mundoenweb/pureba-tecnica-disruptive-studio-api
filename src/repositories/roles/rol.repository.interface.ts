import { RoleEntity } from '../../entities/role.entity'

export interface IRolRepository {
  findAll: () => Promise<RoleEntity[]>
}
