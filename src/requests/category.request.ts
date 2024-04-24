import { Expose } from 'class-transformer'
import { Length } from 'class-validator'
import { CategoryEntity } from '../entities/category.entity'

export class CategoryRequest extends CategoryEntity {
  @Expose()
  @Length(6, 150)
  declare name: string
}
