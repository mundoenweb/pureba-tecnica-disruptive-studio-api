import { CategoryEntity } from '../../entities/category.entity'

export interface ICategoryRepository {
  findAll: () => Promise<CategoryEntity[]>
  findOne: (id: string) => Promise<CategoryEntity | null>
  create: (bank: Partial<CategoryEntity>) => Promise<CategoryEntity>
}
