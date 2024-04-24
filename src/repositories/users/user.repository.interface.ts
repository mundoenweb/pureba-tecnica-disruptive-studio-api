import { UserEntity } from '../../entities/user.entity'

export interface IUserRepository {
  findAll: (filter: Partial<UserEntity>) => Promise<UserEntity[]>
  findOne: (id: string) => Promise<UserEntity | null>
  create: (user: Partial<UserEntity>) => Promise<UserEntity>
  update: (id: string, user: Partial<UserEntity>) => Promise<UserEntity | null>
}
