import { ContainerModule } from 'inversify'
import { MODELS } from './types'
import { User } from '../model/user.model'
import { UserEntity } from '../entities/user.entity'
import { Model } from 'mongoose'
import { RoleEntity } from '../entities/role.entity'
import { Rol } from '../model/role.model'
import { Category } from '../model/category.model'
import { CategoryEntity } from '../entities/category.entity'
import { Theme } from '../model/theme.model'
import { ThemesEntity } from '../entities/themes.entity'
import { PostEntity } from '../entities/post.entity'
import { Post } from '../model/post.model'

export const modelsModule = new ContainerModule((bind) => {
  bind<Model<UserEntity>>(MODELS.user).toConstantValue(User)
  bind<Model<RoleEntity>>(MODELS.rol).toConstantValue(Rol)
  bind<Model<CategoryEntity>>(MODELS.category).toConstantValue(Category)
  bind<Model<ThemesEntity>>(MODELS.theme).toConstantValue(Theme)
  bind<Model<PostEntity>>(MODELS.post).toConstantValue(Post)
})
