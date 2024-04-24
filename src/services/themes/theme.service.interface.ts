import { ThemesEntity } from '../../entities/themes.entity'

export interface IThemeService {
  create: (body: ThemesEntity) => Promise<ThemesEntity>
  update: (id: string, body: Partial<ThemesEntity>) => Promise<ThemesEntity>
  findAll: () => Promise<ThemesEntity[]>
  findOne: (id: string) => Promise<ThemesEntity | null>
}
