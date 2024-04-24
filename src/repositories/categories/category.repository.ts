import { MongooseCRUD } from '../common/mongoose.repository'
import { MODELS } from '../../containers/types'
import { Model } from 'mongoose'
import { inject } from 'inversify'
import { ICategoryRepository } from './category.repository.interface'
import { CategoryEntity } from '../../entities/category.entity'

export class CategoryRepository
  extends MongooseCRUD<CategoryEntity>
  implements ICategoryRepository
{
  constructor(@inject(MODELS.category) categoryModel: Model<CategoryEntity>) {
    super({
      model: categoryModel,
      entity: 'categoría',
    })
  }
}
