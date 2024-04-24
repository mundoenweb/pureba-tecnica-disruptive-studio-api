import { CategoryEntity } from '../../entities/category.entity'

export type CategoryServiceRequest = CategoryEntity

export interface ICategoryService {
  create: (body: CategoryServiceRequest) => Promise<CategoryEntity>
  findAll: () => Promise<CategoryEntity[]>
  findOne: (id: string) => Promise<CategoryEntity | null>
}
