import { ThemesEntity } from '../../entities/themes.entity'

export interface IThemeRepository {
  findAll: () => Promise<ThemesEntity[]>
  findOne: (id: string) => Promise<ThemesEntity | null>
  create: (theme: Partial<ThemesEntity>) => Promise<ThemesEntity>
  update: (id: string, theme: Partial<ThemesEntity>) => Promise<ThemesEntity>
}
