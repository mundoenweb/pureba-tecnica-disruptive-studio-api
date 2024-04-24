import { RoleEntity } from './role.entity'

export class UserEntity {
  id?: string
  username: string
  email: string
  rol: RoleEntity | string
  credits: number
  createdAt?: string
  updatedAt?: string
}

export class UpdateUserEntity {
  username: string
  password: string
  email: string
}
