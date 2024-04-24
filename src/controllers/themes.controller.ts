import { fluentProvide } from 'inversify-binding-decorators'
import { Body, Controller, Get, Middlewares, Post, Put, Route } from 'tsoa'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'
import { inject } from 'inversify'
import { SERVICES } from '../containers/types'
import { ICategoryService } from '../services/themes/category.service.interface'
import { CategoryRequest } from '../requests/category.request'
import { CategoryEntity } from '../entities/category.entity'
import { ThemesEntity } from '../entities/themes.entity'
import { ThemesRequest, ThemesUpdateRequest } from '../requests/themes.request'
import { IThemeService } from '../services/themes/theme.service.interface'
import { FieldsToUpdateException } from '../errors/fieldsToUpdate.exception'
import { auth } from '../middlewares/auth.middleware'
import { groupPermissions } from '../constants/dictionary.constant'

@fluentProvide(ThemesController).done()
@Route('themes')
export class ThemesController extends Controller {
  constructor(
    @inject(SERVICES.category)
    private readonly categoryService: ICategoryService,
    @inject(SERVICES.theme)
    private readonly themeService: IThemeService,
  ) {
    super()
  }

  @Get()
  async findAllThemes(): Promise<ThemesEntity[]> {
    const themes = await this.themeService.findAll()
    return themes
  }

  @Middlewares(auth(groupPermissions.admin))
  @Get('{id}')
  async findOneTheme(id: string): Promise<ThemesEntity | null> {
    const theme = await this.themeService.findOne(id)
    return theme
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', ThemesRequest),
  )
  @Post()
  async createTheme(@Body() body: ThemesRequest): Promise<ThemesEntity> {
    return await this.themeService.create(body)
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', ThemesUpdateRequest),
  )
  @Put('{id}')
  async updateTheme(
    id: string,
    @Body() body: ThemesUpdateRequest,
  ): Promise<ThemesEntity> {
    const qtyFieldsUpdated = Object.values(body).filter(Boolean).length
    if (qtyFieldsUpdated === 0) throw new FieldsToUpdateException()

    return await this.themeService.update(id, body)
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', CategoryRequest),
  )
  @Post('categories')
  async createCategory(@Body() body: CategoryRequest): Promise<CategoryEntity> {
    return await this.categoryService.create(body)
  }

  @Middlewares(auth(groupPermissions.admin))
  @Get('categories')
  async findAllCategory(): Promise<CategoryRequest[]> {
    const categories = await this.categoryService.findAll()
    return categories
  }

  @Middlewares(auth(groupPermissions.admin))
  @Get('categories/{id}')
  async findOneCategory(id: string): Promise<CategoryRequest | null> {
    const category = await this.categoryService.findOne(id)
    return category
  }
}
