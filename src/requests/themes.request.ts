import { Expose } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator'
import { ThemesEntity } from '../entities/themes.entity'

export class ThemesRequest extends ThemesEntity {
  @Expose()
  @Length(4, 50)
  declare name: string

  @Expose()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsUrl()
  declare image: string

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  declare categories: string[]
}
export class ThemesUpdateRequest extends ThemesEntity {
  @Expose()
  @IsOptional()
  @Length(4, 50)
  declare name: string

  @Expose()
  @IsOptional()
  @MaxLength(1000)
  @IsUrl()
  declare image: string

  @Expose()
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  declare categories: string[]
}
