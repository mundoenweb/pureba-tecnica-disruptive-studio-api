import { UserEntity } from '../../entities/user.entity'

export interface IUserService {
  create: (body: UserEntity) => Promise<UserEntity>
  update: (id: string, body: Partial<UserEntity>) => Promise<UserEntity>
  findAll: (data?: Partial<UserEntity>) => Promise<UserEntity[]>
  findOne: (id: string) => Promise<UserEntity | null>
}
