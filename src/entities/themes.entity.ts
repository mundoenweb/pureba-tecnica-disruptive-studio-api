import { CategoryEntity } from './category.entity'

export class ThemesEntity {
  id: string
  name: string
  image: string
  categories: CategoryEntity[] | string[]
  createdAt?: string
  updatedAt?: string
}
