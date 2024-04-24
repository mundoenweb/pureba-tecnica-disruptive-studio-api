import { Expose } from 'class-transformer'
import { IsAlphanumeric, IsEmail, IsEnum, Length } from 'class-validator'
import { NameRoles } from '../enums/users.enum'
import { userRoles } from '../constants/dictionary.constant'
import { UserEntity } from '../entities/user.entity'

export class UserRequest extends UserEntity {
  @Expose()
  @IsAlphanumeric()
  @Length(1, 50)
  declare username: string

  @Expose()
  @IsEmail()
  @Length(1, 150)
  declare email: string

  @Expose()
  @IsEnum([NameRoles.CREATOR, NameRoles.READER], {
    message: 'Invalid role',
  })
  declare rol: keyof typeof userRoles
}
