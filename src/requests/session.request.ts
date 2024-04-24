import { Expose } from 'class-transformer'
import { IsAlphanumeric, IsEmail, Length } from 'class-validator'

export class SessionLoginRequest {
  @Expose()
  @IsAlphanumeric()
  @Length(1, 50)
  declare username: string

  @Expose()
  @IsEmail()
  @Length(1, 150)
  declare email: string
}
