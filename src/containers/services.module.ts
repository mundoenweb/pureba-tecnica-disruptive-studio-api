import { ContainerModule } from 'inversify'
import { SERVICES } from './types'
import { UserService } from '../services/user/user.service'
import { IUserService } from '../services/user/user.service.interface'
import { CategoryService } from '../services/themes/category.service'
import { ICategoryService } from '../services/themes/category.service.interface'
import { IThemeService } from '../services/themes/theme.service.interface'
import { ThemeService } from '../services/themes/theme.service'
import { IPostService } from '../services/post/post.service.interface'
import { PostService } from '../services/post/post.service'
import { ISessionService } from '../services/session/session.service.interface'
import { SessionService } from '../services/session/session.service'

export const serviceModule = new ContainerModule((bind) => {
  bind<IUserService>(SERVICES.user).to(UserService).inSingletonScope()
  bind<IThemeService>(SERVICES.theme).to(ThemeService).inSingletonScope()
  bind<IPostService>(SERVICES.post).to(PostService).inSingletonScope()
  bind<ISessionService>(SERVICES.session).to(SessionService).inSingletonScope()
  bind<ICategoryService>(SERVICES.category)
    .to(CategoryService)
    .inSingletonScope()
})
