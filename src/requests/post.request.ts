import { Expose } from 'class-transformer'
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator'
import { PostEntity } from '../entities/post.entity'

export class PostRequest extends PostEntity {
  @Expose()
  @IsNotEmpty()
  @MaxLength(150)
  declare name: string

  @Expose()
  @IsOptional()
  @MaxLength(1000)
  @IsUrl()
  declare image?: string

  @Expose()
  @IsOptional()
  @MaxLength(250)
  @IsUrl()
  declare video?: string

  @Expose()
  @IsOptional()
  @MaxLength(3000)
  declare text?: string

  @Expose()
  @IsMongoId()
  declare theme: string

  @Expose()
  @IsMongoId()
  declare user: string
}

export class PostUpdateRequest extends PostEntity {
  @Expose()
  @IsOptional()
  @MaxLength(150)
  declare name: string

  @Expose()
  @IsOptional()
  @MaxLength(1000)
  @IsUrl()
  declare image?: string

  @Expose()
  @IsOptional()
  @MaxLength(250)
  @IsUrl()
  declare video?: string

  @Expose()
  @IsOptional()
  @MaxLength(3000)
  declare text?: string

  @Expose()
  @IsOptional()
  @IsMongoId()
  declare theme: string
}
export class PostFindQueryRequest {
  @Expose()
  @IsOptional()
  declare name: string
}
