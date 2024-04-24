import { ContainerModule } from 'inversify'
import { UserRepository } from '../repositories/users/user.repository'
import { IUserRepository } from '../repositories/users/user.repository.interface'
import { REPOSITORIES } from './types'
import { IRolRepository } from '../repositories/roles/rol.repository.interface'
import { RolRepository } from '../repositories/roles/user.repository'
import { ICategoryRepository } from '../repositories/categories/category.repository.interface'
import { CategoryRepository } from '../repositories/categories/category.repository'
import { ThemeRepository } from '../repositories/themes/theme.repository'
import { IThemeRepository } from '../repositories/themes/theme.repository.interface'
import { IPostRepository } from '../repositories/posts/post.repository.interface'
import { PostRepository } from '../repositories/posts/post.repository'

export const repositoriesModule = new ContainerModule((bind) => {
  bind<IUserRepository>(REPOSITORIES.user).to(UserRepository).inSingletonScope()
  bind<IRolRepository>(REPOSITORIES.rol).to(RolRepository).inSingletonScope()
  bind<IPostRepository>(REPOSITORIES.post).to(PostRepository).inSingletonScope()
  bind<ICategoryRepository>(REPOSITORIES.category)
    .to(CategoryRepository)
    .inSingletonScope()
  bind<IThemeRepository>(REPOSITORIES.theme)
    .to(ThemeRepository)
    .inSingletonScope()
})
