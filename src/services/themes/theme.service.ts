import { inject, injectable } from 'inversify'
import { REPOSITORIES } from '../../containers/types'
import { IThemeService } from './theme.service.interface'
import { IThemeRepository } from '../../repositories/themes/theme.repository.interface'
import { ThemesEntity } from '../../entities/themes.entity'

@injectable()
export class ThemeService implements IThemeService {
  constructor(
    @inject(REPOSITORIES.theme)
    private readonly themeRepository: IThemeRepository,
  ) {}

  async findOne(id: string): Promise<ThemesEntity | null> {
    return await this.themeRepository.findOne(id)
  }

  async findAll(): Promise<ThemesEntity[]> {
    return await this.themeRepository.findAll()
  }

  async create(data: ThemesEntity): Promise<ThemesEntity> {
    const result = await this.themeRepository.create(data)
    return result
  }

  async update(id: string, data: Partial<ThemesEntity>): Promise<ThemesEntity> {
    const result = await this.themeRepository.update(id, data)
    return result
  }
}
