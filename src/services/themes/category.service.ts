import { inject, injectable } from 'inversify'
import { REPOSITORIES } from '../../containers/types'
import {
  CategoryServiceRequest,
  ICategoryService,
} from './category.service.interface'
import { ICategoryRepository } from '../../repositories/categories/category.repository.interface'
import { CategoryEntity } from '../../entities/category.entity'

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(REPOSITORIES.category)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findOne(id: string): Promise<CategoryEntity | null> {
    return await this.categoryRepository.findOne(id)
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAll()
  }

  async create(data: CategoryServiceRequest): Promise<CategoryEntity> {
    const result = await this.categoryRepository.create(data)
    return result
  }
}
