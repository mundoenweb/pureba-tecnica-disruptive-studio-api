import { MongooseCRUD } from '../common/mongoose.repository'
import { MODELS } from '../../containers/types'
import { Model } from 'mongoose'
import { inject } from 'inversify'
import { IThemeRepository } from './theme.repository.interface'
import { ThemesEntity } from '../../entities/themes.entity'

export class ThemeRepository
  extends MongooseCRUD<ThemesEntity>
  implements IThemeRepository
{
  constructor(@inject(MODELS.theme) themeModel: Model<ThemesEntity>) {
    super({
      model: themeModel,
      entity: 'temática',
    })
  }

  async findOne(id: string): Promise<ThemesEntity> {
    const result = await this.Model.findById(id)
      .populate('categories', '-createdAt -updatedAt')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result as unknown as ThemesEntity
  }

  async findAll(): Promise<ThemesEntity[]> {
    const result = await this.Model.find()
      .populate('categories', '-createdAt -updatedAt')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result
  }

  async create(payload: Partial<ThemesEntity>): Promise<ThemesEntity> {
    const newModel = new this.Model(payload)
    const theme = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))

    const result = await theme
      .populate('categories', '-createdAt -updatedAt')
      .catch((error) => this.validateError(error, 'create'))
    return result.toJSON() as unknown as ThemesEntity
  }

  async update(
    id: string,
    payload: Partial<ThemesEntity>,
  ): Promise<ThemesEntity> {
    const theme = await this.Model.findByIdAndUpdate(
      id,
      { $set: payload as unknown as Record<string, unknown> },
      { new: true },
    )
      .exec()
      .catch((error) => this.validateError(error, 'update'))

    const result = await theme
      ?.populate('categories', '-createdAt -updatedAt')
      .catch((error) => this.validateError(error, 'create'))
    return result?.toJSON() as unknown as ThemesEntity
  }
}
